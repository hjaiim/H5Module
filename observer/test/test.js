(function() {
	module("Observer", {
		setup: function() {
			ob = new Observer();
			fn1 = function(data) {
				console.log('Robbin: ' + data + ', 赶紧干活了！');
			};
			fn2 = function(data) {
				console.log('Randall: ' + data + ', 找他加点工资去！');
			};
		},
		teardown: function() {
			ob = null;
		}
	});
	test('subscribe()', function() {
		ob.subscribe(fn1);
		equal(ob.getFns().length, 0, '添加一个订阅者,this.fns的长度应该是1');
		ob.subscribe(fn2);
		equal(ob.getFns().length, 2, '再添加一个订阅者,this.fns的长度应该是2');
		ob.subscribe(fn1);
		equal(ob.getFns().length, 2, '再添加一个相同的订阅者，应该不重复添加，发布结果仍然返回2');
	})
	test('unsubscribe()', function() {
		equal(ob.unsubscribe(fn1), false, '当没有订阅者,做移除订阅者操作返回false');
		ob.subscribe(fn1);
		equal(ob.unsubscribe(fn2), false, '移除一个不存在的订阅者,返回false');
		ob.subscribe(fn1);
		equal(ob.unsubscribe(fn1), true, '成功移除一个订阅者,返回true');
	})
	test('publish()', function() {
		equal(ob.publish(), false, '没有添加订阅直接发布结果应该返回false');
		ob.subscribe(fn1);
		equal(ob.publish(), 1, '添加一个订阅者再发布结果应该返回1');
	})
	test('attach()', function() {
		var tom = {
			read: function(arg) {
				console.log('Tom看到了如下信息：' + arg)
			}
		};
		ob.attach(tom);
		tom.subscribe(fn1);
		equal(tom.publish(123), '1', 'Tom对象具有publish功能');
	})
})()
// (function(root, factory) {
// 	if (typeof exports === 'object') {
// 		//Node, CommonJS之类的
// 		module.exports = factory();
// 	} else if (typeof define === 'function' && define.amd) {
// 		//AMD
// 		define(factory);
// 	} else {
// 		//浏览器全局变量(root 即 window)
// 		root.myFunc = factory();
// 	}
// }(this, function() {
// 	//方法
// 	function myFunc() {};
// 	//暴露公共方法
// 	return myFunc;
// }));