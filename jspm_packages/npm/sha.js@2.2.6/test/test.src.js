/* */ 
(function(Buffer) {
  var crypto = require("github:jspm/nodelibs@0.0.5/crypto");
  var tape = require("tape");
  var Sha1 = require("../index").sha1;
  var Uint32toHex = Sha1.Uint32toHex;
  function generateCount(m) {
    var s = '';
    for (var i = 0; i < m / 8; i++) {
      console.log('GENERATE', i, Uint32toHex(i));
      s += i;
    }
    return s;
  }
  var inputs = [['', 'ascii'], ['abc', 'ascii'], ['123', 'ascii'], ['123456789abcdef123456789abcdef123456789abcdef123456789abcdef', 'ascii'], ['123456789abcdef123456789abcdef123456789abcdef123456789abc', 'ascii'], ['123456789abcdef123456789abcdef123456789abcdef123456789ab', 'ascii'], ['0123456789abcdef0123456789abcdef0123456789abcdef0123456789abcde', 'ascii'], ['0123456789abcdef0123456789abcdef0123456789abcdef0123456789abcdef', 'ascii'], ['foobarbaz', 'ascii']];
  tape("hash is the same as node's crypto", function(t) {
    inputs.forEach(function(v) {
      var a = new Sha1().update(v[0], v[1]).digest('hex');
      var e = crypto.createHash('sha1').update(v[0], v[1]).digest('hex');
      console.log(a, '==', e);
      t.equal(a, e);
    });
    t.end();
  });
  tape('call update multiple times', function(t) {
    var n = 1;
    inputs.forEach(function(v) {
      var hash = new Sha1();
      var _hash = crypto.createHash('sha1');
      for (var i = 0; i < v[0].length; i = (i + 1) * 2) {
        var s = v[0].substring(i, (i + 1) * 2);
        hash.update(s, v[1]);
        _hash.update(s, v[1]);
      }
      var a = hash.digest('hex');
      var e = _hash.digest('hex');
      console.log(a, '==', e);
      t.equal(a, e);
    });
    t.end();
  });
  tape('call update twice', function(t) {
    var _hash = crypto.createHash('sha1');
    var hash = new Sha1();
    _hash.update('foo', 'ascii');
    hash.update('foo', 'ascii');
    _hash.update('bar', 'ascii');
    hash.update('bar', 'ascii');
    _hash.update('baz', 'ascii');
    hash.update('baz', 'ascii');
    var a = hash.digest('hex');
    var e = _hash.digest('hex');
    t.equal(a, e);
    t.end();
  });
  tape('hex encoding', function(t) {
    var n = 1;
    inputs.forEach(function(v) {
      var hash = new Sha1();
      var _hash = crypto.createHash('sha1');
      for (var i = 0; i < v[0].length; i = (i + 1) * 2) {
        var s = v[0].substring(i, (i + 1) * 2);
        hash.update(new Buffer(s, 'ascii').toString('hex'), 'hex');
        _hash.update(new Buffer(s, 'ascii').toString('hex'), 'hex');
      }
      var a = hash.digest('hex');
      var e = _hash.digest('hex');
      console.log(a, '==', e);
      t.equal(a, e);
    });
    t.end();
  });
})(require("github:jspm/nodelibs@0.0.5/buffer").Buffer);
