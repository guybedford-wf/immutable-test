/* */ 
(function(Buffer, process) {
  var vectors = require("./nist-vectors.json!");
  var tape = require("tape");
  var Buffer = require("github:jspm/nodelibs@0.0.5/buffer").Buffer;
  var hexpp = require("../hexpp");
  var createHash = require("../index");
  function makeTest(alg, i, verbose) {
    var v = vectors[i];
    tape(alg + ': NIST vector ' + i, function(t) {
      if (verbose) {
        console.log(v);
        console.log('VECTOR', i);
        console.log('INPUT', v.input);
        console.log(hexpp(new Buffer(v.input, 'base64')));
        console.log(new Buffer(v.input, 'base64').toString('hex'));
      }
      var buf = new Buffer(v.input, 'base64');
      t.equal(createHash(alg).update(buf).digest('hex'), v[alg]);
      i = ~~(buf.length / 2);
      var buf1 = buf.slice(0, i);
      var buf2 = buf.slice(i, buf.length);
      console.log(buf1.length, buf2.length, buf.length);
      console.log(createHash(alg)._block.length);
      t.equal(createHash(alg).update(buf1).update(buf2).digest('hex'), v[alg]);
      var j,
          buf3;
      i = ~~(buf.length / 3);
      j = ~~(buf.length * 2 / 3);
      buf1 = buf.slice(0, i);
      buf2 = buf.slice(i, j);
      buf3 = buf.slice(j, buf.length);
      t.equal(createHash(alg).update(buf1).update(buf2).update(buf3).digest('hex'), v[alg]);
      setTimeout(function() {
        t.end();
      });
    });
  }
  if (process.argv[2])
    makeTest(process.argv[2], parseInt(process.argv[3]), true);
  else
    vectors.forEach(function(v, i) {
      makeTest('sha1', i);
      makeTest('sha256', i);
      makeTest('sha512', i);
    });
})(require("github:jspm/nodelibs@0.0.5/buffer").Buffer, require("github:jspm/nodelibs@0.0.5/process"));
