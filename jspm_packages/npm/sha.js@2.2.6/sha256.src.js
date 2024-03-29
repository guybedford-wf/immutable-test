/* */ 
(function(Buffer) {
  var inherits = require("github:jspm/nodelibs@0.0.5/util").inherits;
  module.exports = function(Buffer, Hash) {
    var K = [0x428A2F98, 0x71374491, 0xB5C0FBCF, 0xE9B5DBA5, 0x3956C25B, 0x59F111F1, 0x923F82A4, 0xAB1C5ED5, 0xD807AA98, 0x12835B01, 0x243185BE, 0x550C7DC3, 0x72BE5D74, 0x80DEB1FE, 0x9BDC06A7, 0xC19BF174, 0xE49B69C1, 0xEFBE4786, 0x0FC19DC6, 0x240CA1CC, 0x2DE92C6F, 0x4A7484AA, 0x5CB0A9DC, 0x76F988DA, 0x983E5152, 0xA831C66D, 0xB00327C8, 0xBF597FC7, 0xC6E00BF3, 0xD5A79147, 0x06CA6351, 0x14292967, 0x27B70A85, 0x2E1B2138, 0x4D2C6DFC, 0x53380D13, 0x650A7354, 0x766A0ABB, 0x81C2C92E, 0x92722C85, 0xA2BFE8A1, 0xA81A664B, 0xC24B8B70, 0xC76C51A3, 0xD192E819, 0xD6990624, 0xF40E3585, 0x106AA070, 0x19A4C116, 0x1E376C08, 0x2748774C, 0x34B0BCB5, 0x391C0CB3, 0x4ED8AA4A, 0x5B9CCA4F, 0x682E6FF3, 0x748F82EE, 0x78A5636F, 0x84C87814, 0x8CC70208, 0x90BEFFFA, 0xA4506CEB, 0xBEF9A3F7, 0xC67178F2];
    var W = new Array(64);
    function Sha256() {
      this.init();
      this._w = W;
      Hash.call(this, 16 * 4, 14 * 4);
    }
    inherits(Sha256, Hash);
    Sha256.prototype.init = function() {
      this._a = 0x6a09e667 | 0;
      this._b = 0xbb67ae85 | 0;
      this._c = 0x3c6ef372 | 0;
      this._d = 0xa54ff53a | 0;
      this._e = 0x510e527f | 0;
      this._f = 0x9b05688c | 0;
      this._g = 0x1f83d9ab | 0;
      this._h = 0x5be0cd19 | 0;
      this._len = this._s = 0;
      return this;
    };
    function S(X, n) {
      return (X >>> n) | (X << (32 - n));
    }
    function R(X, n) {
      return (X >>> n);
    }
    function Ch(x, y, z) {
      return ((x & y) ^ ((~x) & z));
    }
    function Maj(x, y, z) {
      return ((x & y) ^ (x & z) ^ (y & z));
    }
    function Sigma0256(x) {
      return (S(x, 2) ^ S(x, 13) ^ S(x, 22));
    }
    function Sigma1256(x) {
      return (S(x, 6) ^ S(x, 11) ^ S(x, 25));
    }
    function Gamma0256(x) {
      return (S(x, 7) ^ S(x, 18) ^ R(x, 3));
    }
    function Gamma1256(x) {
      return (S(x, 17) ^ S(x, 19) ^ R(x, 10));
    }
    Sha256.prototype._update = function(M) {
      var W = this._w;
      var a,
          b,
          c,
          d,
          e,
          f,
          g,
          h;
      var T1,
          T2;
      a = this._a | 0;
      b = this._b | 0;
      c = this._c | 0;
      d = this._d | 0;
      e = this._e | 0;
      f = this._f | 0;
      g = this._g | 0;
      h = this._h | 0;
      for (var j = 0; j < 64; j++) {
        var w = W[j] = j < 16 ? M.readInt32BE(j * 4) : Gamma1256(W[j - 2]) + W[j - 7] + Gamma0256(W[j - 15]) + W[j - 16];
        T1 = h + Sigma1256(e) + Ch(e, f, g) + K[j] + w;
        T2 = Sigma0256(a) + Maj(a, b, c);
        h = g;
        g = f;
        f = e;
        e = d + T1;
        d = c;
        c = b;
        b = a;
        a = T1 + T2;
      }
      this._a = (a + this._a) | 0;
      this._b = (b + this._b) | 0;
      this._c = (c + this._c) | 0;
      this._d = (d + this._d) | 0;
      this._e = (e + this._e) | 0;
      this._f = (f + this._f) | 0;
      this._g = (g + this._g) | 0;
      this._h = (h + this._h) | 0;
    };
    Sha256.prototype._hash = function() {
      var H = new Buffer(32);
      H.writeInt32BE(this._a, 0);
      H.writeInt32BE(this._b, 4);
      H.writeInt32BE(this._c, 8);
      H.writeInt32BE(this._d, 12);
      H.writeInt32BE(this._e, 16);
      H.writeInt32BE(this._f, 20);
      H.writeInt32BE(this._g, 24);
      H.writeInt32BE(this._h, 28);
      return H;
    };
    return Sha256;
  };
})(require("github:jspm/nodelibs@0.0.5/buffer").Buffer);
