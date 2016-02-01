/*
 * data 2016/2/1
 * by yangxiaoxu
 */
;
(function ($, window, document, undefined) {
    var DragLoad = function (ele, opt) {
        this.element = ele;
        this.defaults = {
            from : 0,
            pageCount : 10
        };
        this.opts = $.extend({}, this.defaults, opt)
        this.init();
    }

    DragLoad.prototype = {
        /*
         *绑定滚动事件
         */
        init: function () {
            var dragThis = this;
            $(window).scroll(function () {
                //已经滚动到上面的页面高度
                var scrollTop = $(this).scrollTop();
                //页面高度
                var scrollHeight = $(document).height();
                //浏览器窗口高度
                var windowHeight = $(this).height();
                //此处是滚动条到底部时候触发的事件，在这里写要加载的数据，或者是拉动滚动条的操作
                if (scrollTop + windowHeight == scrollHeight) {
                    dragThis.insertDom();
                }
            });
        },
        /*
         *获取下一页的数据
         */
        getData: function () {
            var dragThis = this;
            $.ajax({
                type: 'GET',
                url: dragThis.opts.url,
                data: {
                    from: dragThis.opts.from,
                    pageCount: dragThis.opts.pageCount
                },
                dataType: 'json',
                timeout: 5000,
                success: function (data) {
                    //console.info(data);
                    dragThis.render(data);
                },
                error: function (xhr, type) {
                    console.error(type);
                }
            })
        },
        render: function (data) {
            //用户自定义的化调用自用的方法
            if( typeof this.opts.domPackageFunction === 'function' ){
                var dom = this.opts.domPackageFunction(data);
            }else{
                var dom = "";
                for (item in data) {
                    dom += '<a class="item" href="#">' + '<img src="http://d6.yihaodianimg.com/N02/M0B/81/5A/CgQCsVMhX_mAAvXsAAJDE3K2zh485900_80x80.jpg" alt="">' +
                        '<h3>'+data[item].title+'</h3>' + '<span class="date">2014-14-14</span>' + '</a>';
                }
            }
            this.element.append(dom);
            this.opts.from = this.opts.from + this.opts.pageCount;
        },
        insertDom: function () {
            var data = this.getData();
        },
        returnOjb: function () {
            return this.element;
        }
    }

    //在插件中使用DragLoad对象
    $.fn.dragLoad = function (options) {
        //创建Beautifier的实体
        var dragLoad = new DragLoad(this, options);
        //调用其方法
        return dragLoad.returnOjb();
    }

})(jQuery, window, document);