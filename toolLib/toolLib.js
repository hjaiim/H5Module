/**
 * @validator jsg工具库
 * @author yangxiaoxu
 * @email lihuazhai_com@163.com
 * @website www.lihuazhai.com
 * @date 2016-04-19
 */

(function(root) {
	/**
	 * 通用工具栏
	 * @class tools
	 * @constructor
	 */
	var tools = function() {

	};
	/**
	 * 函数参数验证
	 * @method checkArgument
	 * @param args {Array}  待检查的参数
	 * @param opt {Array}   参数类型列表
	 * @return {Boolean} 验证成功返回true,否则返回false
	 * @example
	 *	function test(arg1,arg2){
	 *		if(!checkArgument(arguments, ['string','number'])){
	 *         console.log("参数错误！")
	 *		}
	 *	}
	 *	test("123")
	 * 	
	 */
	tools.prototype.checkArgument = function(args, opt) {
		if (args.length === opt.length) {
			for (var i = 0; i < args.length; i++) {
				if (typeof(args[i]) != opt[i]) {
					console.log('参数类型不对！')
					return false;
					break;
				}
			}
		} else {
			console.log('参数个数不对！')
			return false;
		}
		return true;
	};

	/**
	 * UMD 模块的写法输出
	 * @method _moduleExport
	 * @private
	 * @param myfun {String} 要输出的对象引入
	 */
	var _moduleExport = function(myfun) {
		if (typeof define === "function" && define.amd) { //AMD
			define(function() {
				return myfun;
			});
		} else if (typeof exports === 'object') { //Node, CommonJS之类的
			module.exports = myfun;
		} else { //浏览器全局变量(root 即 window)
			root.tools = myfun;
		}
	}
	_moduleExport(tools);

})(window)