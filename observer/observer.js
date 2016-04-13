define(function() {
	/**
	 *订阅模式
	 */
	function Observer() {
		this.fns = []; // 订阅者存放的数组
	}
	Observer.prototype = {
		/**
		 *添加订阅者
		 */
		subscribe: function(fn) {
			if (!this.fns[fn]) {
				this.fns.push(fn);
			}
		},
		/**
		 *移除订阅者
		 */
		unsubscribe: function(fn) {
			if (this.fns.length === 0) {
				return false;
			}
			if (!Array.prototype.filter) {
				this.fns = this.fns.filter(
					function(el) {
						if (el !== fn) {
							return el;
						}
					}
				);
			} else {
				/*如果不支持filter*/
				for (var i = 0, j = this.fns.length; i < j; i++) {
					if (this.fns[i] === fn) {
						this.fns.splice(i, 1);
						return true;
					}
				}
			}
		},
		/**
		 *发布
		 * thisObj 可以挂到指定发布者对象上
		 */
		publish: function(arg, thisObj) {
			if (this.fns.length === 0) {
				return false;
			}
			var scope = thisObj || window;
			if (!Array.prototype.forEach) {
				this.fns.forEach(
					function(el) {
						el.call(scope, arg);
					}
				);
			} else {
				/*如果不支持forEach*/
				for (var i = 0; i < this.fns.length; i++) {
					if (typeof this.fns[i] === 'function') {
						this.fns[i].call(scope, arg);
					}
				}
			}
		},
		/**
		 *  赋予对象obj观察者功能
		 */
		attach: function(obj) {
			for (var i in this) {
				obj[i] = this[i];
				obj.fns = [];
			}
		}
	};
	return Observer;
});