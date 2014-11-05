/* */ 
(function(process) {
  var path = require("github:jspm/nodelibs@0.0.5/path");
  var exec = require("child_process").exec;
  var fs = require("github:jspm/nodelibs@0.0.5/fs");
  var testCase = require("nodeunit").testCase;
  var ansidiff = require("ansidiff");
  var warn = console.warn;
  var data = {parseLookup: function(test) {
      var parseLookup = require("../lib/json").parseLookup;
      test.deepEqual(parseLookup('42'), [42]);
      test.deepEqual(parseLookup('a'), ['a']);
      test.deepEqual(parseLookup('a.b'), ['a', 'b']);
      test.deepEqual(parseLookup('a.b.c'), ['a', 'b', 'c']);
      test.deepEqual(parseLookup('[42]'), [42]);
      test.deepEqual(parseLookup('["a"]'), ['a']);
      test.deepEqual(parseLookup('["a"]'), ['a']);
      test.deepEqual(parseLookup('b[42]'), ['b', 42]);
      test.deepEqual(parseLookup('b["a"]'), ['b', 'a']);
      test.deepEqual(parseLookup('b["a"]'), ['b', 'a']);
      test.deepEqual(parseLookup('[42].b'), [42, 'b']);
      test.deepEqual(parseLookup('["a"].b'), ['a', 'b']);
      test.deepEqual(parseLookup('["a"].b'), ['a', 'b']);
      test.deepEqual(parseLookup('["a-b"]'), ['a-b']);
      test.deepEqual(parseLookup('["a-b"]'), ['a-b']);
      test.deepEqual(parseLookup('["a.b"]'), ['a.b']);
      test.deepEqual(parseLookup('["a.b"]'), ['a.b']);
      test.deepEqual(parseLookup('["a[b"]'), ['a[b']);
      test.deepEqual(parseLookup('["a[b"]'), ['a[b']);
      test.deepEqual(parseLookup('["a]b"]'), ['a]b']);
      test.deepEqual(parseLookup('["a]b"]'), ['a]b']);
      test.deepEqual(parseLookup("['a\\'[b']"), ["a'[b"]);
      test.deepEqual(parseLookup("['a\\'[b'].c"), ["a'[b", "c"]);
      test.deepEqual(parseLookup('a/b', '/'), ['a', 'b']);
      test.deepEqual(parseLookup('a.b/c', '/'), ['a.b', 'c']);
      test.deepEqual(parseLookup('a.b/c[42]', '/'), ['a.b', 'c', 42]);
      test.deepEqual(parseLookup('["a/b"]', '/'), ['a/b']);
      test.done();
    }};
  var only = [],
      excludes = [];
  if (process.env.TEST_ONLY) {
    warn('Note: Limiting "test.js" tests by $TEST_ONLY: "' + process.env.TEST_ONLY + '"');
    var tokens = process.env.TEST_ONLY.trim().split(/\s+/);
    for (var i = 0; i < tokens.length; i++) {
      if (tokens[i][0] === '-') {
        excludes.push(tokens[i].slice(1));
      } else {
        only.push(tokens[i]);
      }
    }
  }
  var names = fs.readdirSync(__dirname);
  for (var i = 0; i < names.length; ++i) {
    var name = names[i];
    if (only.length && only.indexOf(name) == -1) {
      continue;
    }
    if (excludes.length && excludes.indexOf(name) != -1) {
      continue;
    }
    var dir = path.join(__dirname, name);
    if (fs.statSync(dir).isDirectory()) {
      try {
        fs.statSync(path.join(dir, 'cmd'));
      } catch (e) {
        continue;
      }
      if (data[name] !== undefined) {
        throw ('error: test "' + name + '" already exists');
      }
      data[name] = (function(dir) {
        return function(test) {
          var numTests = 0;
          var expectedExitCode = null;
          try {
            var p = path.join(dir, 'expected.exitCode');
            if (fs.statSync(p)) {
              expectedExitCode = Number(fs.readFileSync(p));
              numTests += 1;
            }
          } catch (e) {}
          var expectedStdout = null;
          try {
            var p = path.join(dir, 'expected.stdout');
            if (fs.statSync(p)) {
              expectedStdout = fs.readFileSync(p, 'utf8');
              numTests += 1;
            }
          } catch (e) {}
          var expectedStderr = null;
          try {
            var p = path.join(dir, 'expected.stderr');
            if (fs.statSync(p)) {
              expectedStderr = fs.readFileSync(p, 'utf8');
              numTests += 1;
            }
          } catch (e) {}
          test.expect(numTests);
          exec('bash cmd', {'cwd': dir}, function(error, stdout, stderr) {
            var errmsg = ('\n-- return value:\n' + (error && error.code) + '\n-- expected stdout:\n' + expectedStdout + '\n-- stdout:\n' + stdout + '\n-- stdout diff:\n' + ansidiff.chars(expectedStdout, stdout));
            if (expectedStderr !== null) {
              errmsg += '\n-- expected stderr:\n' + expectedStderr;
            }
            if (stderr !== null) {
              errmsg += '\n-- stderr:\n' + stderr;
            }
            if (expectedStderr !== null) {
              errmsg += '\n-- stderr diff:\n' + ansidiff.chars(expectedStderr, stderr);
            }
            if (expectedExitCode !== null) {
              test.equal(expectedExitCode, error && error.code || 0, '\n\nunexpected exit code' + errmsg);
            }
            if (expectedStdout !== null) {
              test.equal(stdout, expectedStdout, '\n\nunexpected stdout' + errmsg);
            }
            if (expectedStderr !== null) {
              test.equal(stderr, expectedStderr, '\n\nunexpected stderr' + errmsg);
            }
            test.done();
          });
        };
      })(dir);
    }
  }
  exports['test'] = testCase(data);
})(require("github:jspm/nodelibs@0.0.5/process"));
