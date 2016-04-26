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
	 * 验证器
	 * @class Validator
	 * @constructor
	 */
	var Validator = function(dom) {
		this.itemList = [];
		this.dom = dom instanceof jQuery ? dom : $(dom) || null;
		Validator_rule.apply(this);
		this.init();
	};
	//继承Validator_rule的方法和属性
	Validator.prototype = Validator_rule.prototype;
	/** 
	 * 初始化
	 *
	 * @method init
	 * @return {} 无
	 */
	Validator.prototype.init = function() {
		var V_this = this;
		this.dom.each(function(index) {
			
			var t = $(this);
			if (t.attr("data-validator")) {
				V_this.handleItemList(index);
				V_this.bind(t);
			}
		});
	};

	Validator.prototype.handleItemList = function(index) {
		console.log(index);
		//var itemObj = {"item"}
		this.itemList.push();

	};
	/** 
	 * 绑定验证事件
	 *
	 * @method bind
	 * @param {Function} 待移绑定的对象
	 * @return {} 无
	 */
	Validator.prototype.bind = function(obj) {
		var V_this = this;
		obj.bind('blur', function() {
			var t = $(this);
			var value = t.val();
			var ruleName = t.attr("data-validator");
			if (!V_this.validate(value, ruleName)) {
				V_this.showTip(t, ruleName);
			} else {
				V_this.hideTip(t);
			}
		});
	};
	/** 
	 * 验证
	 *
	 * @method validate
	 * @param value {String} 表单的值
	 * @param ruleName {String} 验证规则名称
	 * @return {Boolean} 验证通过返回true,否则返回false
	 */
	Validator.prototype.validate = function(value, ruleName) {
		var rule = this.getRule(ruleName);
		if (!rule) {
			return true;
		}
		return rule.test(value);
	};
	/** 
	 * 显示提示
	 *
	 * @method showTip
	 * @param ele {Object} 表单的对象
	 * @param ruleName {Function} 验证规则名称
	 * @return {Boolean} 验证通过返回true,否则返回false
	 */
	Validator.prototype.showTip = function(ele, ruleName) {
		var tip = this.getTip(ruleName);
		if (ele.next().attr('class') == "validator_top") {
			ele.next().html(tip);
		} else {
			ele.after('<p class="validator_top">' + tip + '</p>');
		}
	};
	/** 
	 * 移除提示
	 *
	 * @method hideTip
	 * @param ele {Object} 表单的对象
	 * @return {} 无
	 */
	Validator.prototype.hideTip = function(ele) {
		ele.next().html("");
	};


	/** 
	 * 动态添加待测试项
	 *
	 * @method addItemDom
	 * @param {Object} 待移除的订阅者
	 * @return {} 无
	 */
	Validator.prototype.addItemDom = function(newDom) {
		var V_this = this;
		this.newdom = newDom instanceof jQuery ? newDom : $(newDom) || null;
		this.newdom.each(function() {
			var t = $(this);
			if (t.attr("data-validator")) {
				V_this.bind(t);
			}
		});
	};

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