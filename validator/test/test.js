(function() {

	module("validator_rule", {
		setup: function() {
			rule = new Validator_rule();
			emailRule = {
				rule: /^([a-zA-Z0-9]+[_|\_|\.\-]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,4}$/,
				tip: '邮箱格式错误'
			}
		},
		teardown: function() {
			rule = null;
		}
	});
	test('getRule()', function() {
		equal(rule.getRule(), false, '参数缺失，应该返回失败');
		equal(rule.getRule("emailRule"), false, '调用一个不存在的规则，应该返回false');
		equal(rule.getRule("integer"), '/^[0-9]+$/', '调用整数验证规则，应该返回"/^[0-9]+$/"');
	});

	test('setRule()', function() {
		equal(rule.setRule(), false, '参数缺失，应该返回失败');
		equal(rule.setRule(emailRule), false, '参数缺失，应该返回失败');
		equal(rule.setRule("emailRule",emailRule), true, '返回true');
	})



	// module("validator", {
	// 	setup: function() {
	// 		va = new Validator();
	// 	},
	// 	teardown: function() {
	// 		va = null;
	// 	}
	// });
	// test('rule', function() {
	// 	ob.subscribe(fn1);
	// 	equal(ob.getFns().length, 0, '添加一个订阅者,this.fns的长度应该是1');
	// 	ob.subscribe(fn2);
	// 	equal(ob.getFns().length, 2, '再添加一个订阅者,this.fns的长度应该是2');
	// 	ob.subscribe(fn1);
	// 	equal(ob.getFns().length, 2, '再添加一个相同的订阅者，应该不重复添加，发布结果仍然返回2');
	// })
	// test('unsubscribe()', function() {
	// 	equal(ob.unsubscribe(fn1), false, '当没有订阅者,做移除订阅者操作返回false');
	// 	ob.subscribe(fn1);
	// 	equal(ob.unsubscribe(fn2), false, '移除一个不存在的订阅者,返回false');
	// 	ob.subscribe(fn1);
	// 	equal(ob.unsubscribe(fn1), true, '成功移除一个订阅者,返回true');
	// })
	// test('publish()', function() {
	// 	equal(ob.publish(), false, '没有添加订阅直接发布结果应该返回false');
	// 	ob.subscribe(fn1);
	// 	equal(ob.publish(), 1, '添加一个订阅者再发布结果应该返回1');
	// })
	// test('attach()', function() {
	// 	var tom = {
	// 		read: function(arg) {
	// 			console.log('Tom看到了如下信息：' + arg)
	// 		}
	// 	};
	// 	ob.attach(tom);
	// 	tom.subscribe(fn1);
	// 	equal(tom.publish(123), '1', 'Tom对象具有publish功能');
	// })
})()