/* */
!function(t,e){function r(e,r,o){var a=n[r];i(e+": NIST vector "+r,function(n){o&&(console.log(a),console.log("VECTOR",r),console.log("INPUT",a.input),console.log(s(new t(a.input,"base64"))),console.log(new t(a.input,"base64").toString("hex")));var i=new t(a.input,"base64");n.equal(u(e).update(i).digest("hex"),a[e]),r=~~(i.length/2);var h=i.slice(0,r),c=i.slice(r,i.length);console.log(h.length,c.length,i.length),console.log(u(e)._block.length),n.equal(u(e).update(h).update(c).digest("hex"),a[e]);var f,_;r=~~(i.length/3),f=~~(2*i.length/3),h=i.slice(0,r),c=i.slice(r,f),_=i.slice(f,i.length),n.equal(u(e).update(h).update(c).update(_).digest("hex"),a[e]),setTimeout(function(){n.end()})})}var n=require("./nist-vectors.json!"),i=require("tape"),t=require("github:jspm/nodelibs@0.0.5/buffer").Buffer,s=require("../hexpp"),u=require("../index");e.argv[2]?r(e.argv[2],parseInt(e.argv[3]),!0):n.forEach(function(t,e){r("sha1",e),r("sha256",e),r("sha512",e)})}(require("github:jspm/nodelibs@0.0.5/buffer").Buffer,require("github:jspm/nodelibs@0.0.5/process"));
//# sourceMappingURL=vectors.js.map