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

})()