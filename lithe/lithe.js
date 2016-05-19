;
(function(window, document, undefined) {
	/** 
	 * 加载效果
	 *
	 * @method loadShow
	 * @param fn {Function} 
	 * @return {Boolean} 
	 */
	var loadShow = function(dom) {
		if (dom) {
			var html = '<div class="loader"></div>';
			dom.html(html);
		} else {
			var shadeHtml = '<div class="shade-bg">' + '<div class="loader"></div>' + '</div>';
			$('body').append(shadeHtml);
		}
	};
	/** 
	 * 关闭加载效果
	 *
	 * @method loadClose
	 * @param fn {Function} 
	 * @return {Boolean} 
	 */
	var loadClose = function(dom) {
		$('.shade-bg').hide();
	};
	/** 
	 * 提示效果
	 *
	 * @method tipBox
	 * @param fn {Function} 
	 * @return {Boolean} 
	 */
	var tipBox = function(arg, time) {
		if (arg) {
			//如果tipBoxDom已经存在，只需显示出来，不用重新创建
			if ($(".tipBox").length > 0) {
				$(".tipBox").text(arg).show();
			} else {
				var tipHtml = '<div class="tipBox">' + arg + '</div>';
				$('body').prepend(tipHtml);
			}
		} else {
			console.log('缺乏提示文案！');
			return false;
		}
		if (!isNaN(time)) {
			setTimeout('$(".tipBox").hide()', time);
		}
	};
	/** 
	 * 提示效果消失
	 *
	 * @method tipBoxClose
	 * @param fn {Function} 
	 * @return {Boolean} 
	 */
	var tipBoxClose = function(arg, time) {
		$(".tipBox").hide();
	};

	/** 
	 * 切换按钮
	 *
	 * @method tipBoxClose
	 * @param fn {Function} 
	 * @return {Boolean} 
	 */
	var switchButton = function(dom) {
		var switchButtonHtml = '<label class="switchButton">' 
								+ '<input type="checkbox" class="ios-switch-input" checked="checked" />' 
								+ '<div class="ios-switch-wrap">' 
									+ '<div class="ios-switch-cursor"></div>' 
								+ '</div>' 
							+ '</label>';
		dom.html(switchButtonHtml);
	};

	window.lithe = {
		loadShow: loadShow,
		loadClose: loadClose,
		tipBox: tipBox,
		tipBoxClose: tipBoxClose,
		switchButton: switchButton
	};
})(window, document)