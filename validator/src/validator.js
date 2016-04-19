/**
 * @validator 表单验证组件
 * @author yangxiaoxu
 * @email lihuazhai_com@163.com
 * @website www.lihuazhai.com
 * @date 2016-04-18
 */
(function(root) {
	/**
	 * This is the description for my class.
	 * 订阅模式
	 * @class Observer
	 * @constructor
	 */
	var Validator = function() {

	};
	/** 
	 * 获取对应验证规则
	 *
	 * @method validate
	 * @param {Function} 待移除的订阅者
	 * @return {Boolean} 验证通过返回true,否则返回false
	 */
	Validator.prototype.getRule = function(first_argument) {
		// TODO
	};

	/** 
	 * 获取所选的值
	 *
	 * @method getValue
	 * @param {Function} 待移除的订阅者
	 * @return {String}  返回值
	 */
	Validator.prototype.getValue = function() {
		// TODO
	};

	/** 
	 * 验证
	 *
	 * @method validate
	 * @param {Function} 待移除的订阅者
	 * @return {Boolean} 验证通过返回true,否则返回false
	 */
	Validator.prototype.validate = function() {
		// TODO
	}



	/**
	 *UMD 模块的写法输出
	 *@method _moduleExport
	 *@private
	 */
	var _moduleExport = function(myfun) {
		if (typeof define === "function" && define.amd) { //AMD
			define(function() {
				return myfun;
			});
		} else if (typeof exports === 'object') { //Node, CommonJS之类的
			module.exports = myfun;
		} else { //浏览器全局变量(root 即 window)
			root.Validator = myfun;
		}
	}
	_moduleExport(Validator);

})(window)