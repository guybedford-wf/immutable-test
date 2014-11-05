/* */
!function(t){var e=module.exports=function(t){var r=e[t.toLowerCase()];if(!r)throw new Error(t+" is not supported (we accept pull requests)");return new r},t=require("buffer/index").Buffer,r=require("./hash")(t);e.sha=e.sha1=require("./sha1")(t,r),e.sha256=require("./sha256")(t,r)}(require("github:jspm/nodelibs@0.0.5/buffer").Buffer);
//# sourceMappingURL=browserify.js.map