# observer 观察者模式

## 例子
	var o = new Observer;
	var f1 = function(data) {
	    console.log('Robbin: ' + data + ', 赶紧干活了！');
	};
	
	var f2 = function(data) {
	    console.log('Randall: ' + data + ', 找他加点工资去！');
	};
	
	o.subscribe(f1);
	o.subscribe(f2);
	
	o.publish("Tom回来了！")
	
	//退订f1
	o.unsubscribe(f1);
	//再来验证
	o.publish("Tom回来了！");


## 实现多个对象推送到不同的订阅者
	//测试二
	var ob = new Observer;
	var blogger = {
	    recommend: function (id) {
	        var msg = 'dudu 推荐了的帖子:' + id;
	        this.publish(msg);
	    }
	};

	var user = {
	    vote: function (id) {
	        var msg = '有人投票了!ID=' + id;
	        this.publish(msg);
	    }
	};

	ob.attach(blogger);
	ob.attach(user);

	var tom = {
	    read: function (arg) {
	        console.log('Tom看到了如下信息：' + arg)
	    }
	};

	var jerry = {
	    show: function (arg) {
	        console.log('jerry看到了如下信息：' + arg)
	    }
	};
	// 订阅
	blogger.subscribe(tom.read);
	blogger.subscribe(jerry.show);
	user.subscribe(jerry.show); 
	blogger.recommend(123); //调用发布
	user.vote(456); //调用发布

	//退订
	blogger.unsubscribe(jerry.show);
	blogger.recommend(789); //调用发布

	//另外一个对象的订阅
	user.unsubscribe(jerry.show);
	user.vote(100); //调用发布
