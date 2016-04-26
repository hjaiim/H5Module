/**
 * @validator 表单验证组件-验证规则处理
 * @author yangxiaoxu
 * @email lihuazhai_com@163.com
 * @website www.lihuazhai.com
 * @date 2016-04-18
 */
(function(root) {
	var RULES = {
		required: {
			rule: function(ele) {
				var t = ele.attr("type");
				switch (t) {
					case "checkbox":
					case "radio":
						var n = ele.attr("name");
						var eles = this.formNode.find('input[name="' + n + '"]');
						return util.some(ele, function(item) {
							return item.attr("checked");
						});
					default:
						var v = ele.val();
						if (!v) {
							return false;
						}
						return true;
				}
			},
			triggerMethod: ['blur'],
			tip: '请输入%s'
		},
		trimAll: {
			rule: function(ele) {
				var val = ele.val().replace(/\s+/g, '');
				ele.val(val);
				return true;
			},
			tip: ' %s去除空格'
		},
		minLength: {
			rule: function(ele, num) {
				return ele.val().length >= num;
			},
			tip: '输入的%s长度不能小于%s位'
		},
		maxLength: {
			rule: function(ele, num) {
				return ele.val().length <= num;
			},
			tip: '输入的%s长度不能大于%s位'
		},
		minValue: {
			rule: function(ele, num) {
				return parseFloat(ele.val()) >= num;
			},
			tip: '%s不能小于%s'
		},
		name: {
			rule: /^[\u2FFF-\u9FFF]+(?:·[\u2FFF-\u9FFF]+)*$/,
			tip: '%s格式不正确'
		},
		identity: {
			rule: function(ele) {
				var val = ele.val().replace(/\s+/g, '');
				ele.val(val);
				if (/^\d{15}$|^\d{17}[0-9a-zA-Z]$/.test(val)) {
					return true;
				}
				return false;
			},
			tip: '%s格式为15或18位数字'
		},
		email: {
			rule: /^([a-zA-Z0-9]+[_|\_|\.\-]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,4}$/,
			tip: '邮箱格式错误'
		},
		mobile: {
			rule: /^1[34578]\d{9}$/,
			tip: '手机号码格式错误'
		},
		number: {
			rule: /^[0-9]+$/,
			tip: '%s必须为数字'
		},
		integer: {
			rule: /^[0-9]+$/,
			tip: '%s必须为整数'
		},
		pwd: {
			rule: /^[\w\~\!\@\#\$\%\^\&\*\(\)\+\`\-\=\[\]\\\{\}\|\;\'\:\"\,\.\/\<\>\?0-9a-zA-z]{6,20}$/,
			tip: '%s由6-20个英文字母、数字或符号组成'
		},
		confirm: {
			rule: function(a, b) {
				return a.val() == b.val();
			},
			tip: '两次%s输入不一致'
		},
		trueName: {
			rule: {
				type: ['trimAll', 'required', 'name', ['minLength', 2],
					['maxLength', 20]
				],
				desc: '姓名'
			}
		},
		buyAmount: {
			rule: {
				type: ['required', 'integer', ['minValue', 1]],
				desc: '金额'
			}
		},
		identityCard: {
			rule: {
				type: ['required', 'identity'],
				desc: '身份证'
			}
		},
		mobileNo: {
			rule: {
				type: ['trimAll', 'required', ['minLength', 11],
					['maxLength', 11], 'mobile'
				],
				desc: '手机号码',
				triggerMethod: ['bulr', 'keyup']
			}
		},
		creditNo: {
			rule: {
				type: ['trimAll', 'required', 'number', ['minLength', 6],
					['maxLength', 19]
				],
				desc: '卡号'
			}
		},
		bankCode: {
			rule: {
				type: ['trimAll', 'required', ['minLength', 4],
					['maxLength', 4]
				],
				desc: '银行卡'
			}
		},
		vcodeNo: {
			rule: {
				type: ['trimAll', 'required', ['minLength', 4],
					['maxLength', 4]
				],
				desc: '验证码'
			}
		},
		payPwd: {
			rule: {
				type: ['required', 'pwd'],
				desc: '支付密码'
			}
		},
		payPwdConfirm: {
			rule: {
				type: ['required', ['confirm', $('#pay-pwd')], 'pwd'],
				desc: '支付密码'
			}
		},
		mailCode: {
			rule: {
				type: ['required', 'number', ['minLength', 6],
					['maxLength', 6]
				],
				desc: '邮政编码'
			}
		},
		answer: {
			rule: {
				type: ['required', ['minLength', 2],
					['maxLength', 20]
				],
				desc: '安全问题答案',
				triggerMethod: ['bulr', 'keyup']
			}
		}
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
	var checkArgument = function(args, opt) {
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
	 * 验证规则处理对象
	 * @class Validator_rule
	 * @constructor
	 */
	var Validator_rule = function() {};
	/**
	 * 验证规则对象
	 * 
	 * @property rules
	 * @type {Object}
	 * @default []
	 */
	Validator_rule.prototype.rules = RULES;
	/** 
	 * 获取对应验证规则
	 *
	 * @method getRule
	 * @param ruleName {String}  对应验证规则的name
	 * @return {Object} 验证规则
	 */
	Validator_rule.prototype.getRule = function(ruleName) {
		if (!checkArgument(arguments, ['string'])) {
			return false;
		}
		if (!this.rules[ruleName]) {
			console.log('不存在此规则!');
			return false;
		}
		return this.rules[ruleName].rule || function() {
			return true;
		};
	};
	/** 
	 * 设置对应验证规则
	 *
	 * @method setRule
	 * @param ruleName {String} 对应验证规则的name
	 * @param rule {Object} 验证规则对象
	 * @return {} 无
	 */
	Validator_rule.prototype.setRule = function(ruleName, rule) {
		if (!checkArgument(arguments, ['string', 'Object'])) {
			return false;
		}

		this.rules[ruleName] = rule;
		return true;
	};
	/** 
	 * 获取对应验证规则
	 *
	 * @method getTip
	 * @param ruleName {String} 对应验证规则的name
	 * @return {String} 验证提示文案
	 */
	Validator_rule.prototype.getTip = function(ruleName) {
		return this.rules[ruleName].tip || '';
	};
	/** 
	 * 获取对应验证规则
	 *
	 * @method setTip
	 * @param ruleName {String} 对应验证规则的name
	 * @param tip {String} 验证提示文案
	 * @return {} 无
	 */
	Validator_rule.prototype.setTip = function(ruleName, tip) {
		this.rules[ruleName].tip = tip;
	};
	root.Validator_rule = Validator_rule;
	
})(window);