var UglifyJS = require("uglify-js");

var result = UglifyJS.minify([ "./observer/observer.js", "./dragLoad/js/dragLoad.js" ], {
	outSourceMap: "out.js.map"
});
console.log(result.code); // minified output 
console.log(result.map);