/* */
"format cjs";module.exports=function(){var e=require("./events"),t={};return t.createDomain=t.create=function(){function t(e){r.emit("error",e)}var r=new e.EventEmitter;return r.add=function(e){e.on("error",t)},r.remove=function(e){e.removeListener("error",t)},r.run=function(e){try{e()}catch(t){this.emit("error",t)}return this},r.dispose=function(){return this.removeAllListeners(),this},r},t}.call(this);
//# sourceMappingURL=domain.js.map