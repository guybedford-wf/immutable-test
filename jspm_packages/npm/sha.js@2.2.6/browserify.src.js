/* */ 
(function(Buffer) {
  var exports = module.exports = function(alg) {
    var Alg = exports[alg.toLowerCase()];
    if (!Alg)
      throw new Error(alg + ' is not supported (we accept pull requests)');
    return new Alg();
  };
  var Buffer = require("buffer/index").Buffer;
  var Hash = require("./hash")(Buffer);
  exports.sha = exports.sha1 = require("./sha1")(Buffer, Hash);
  exports.sha256 = require("./sha256")(Buffer, Hash);
})(require("github:jspm/nodelibs@0.0.5/buffer").Buffer);
