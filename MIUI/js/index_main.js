/*---------------模块化js--------------*/
define(function(require, exports, module) {
	require("jquery-3.2.1.js");
	require("data.js");
	require("vue.js");
	
	
	$(function() {

		/*-----------------主轮播区---------------------*/
		(function(){
			var slide = $("#slider");
			var next = $("#slider .next");
			var prev = $("#slider .prev");
			var contain = $("#slider .contain");
			var pointUl = $("#slider .slider-point");
	
			var num = 0;
			var timer = null;
			var temp = true;
	
			/*-----创建轮播图片----*/
			var item = "";
			var slideData = aData.slider;
			for(var i = 0; i < slideData.image.length; i++) {
				item += '<li class="item">' +
					'<a href="#" alt=""><img src="./' + slideData.image[i] + '"></a>' +
					'</li>';
				contain.html(item);
			}
			var slideLi = $(".contain .item");
			
			
			/*轮播左右点击按钮*/
			next.on('click', function() {
				autoPlay();
			})
			prev.on('click', function() {
				slideLi = $(".contain .item");
				num--;
				if(num < 0) num = slideLi.length - 1;
				
				if(temp){//点击的时候先判断temp是否为true，是就让按钮的点击失效，防止双击出现bug
					prev.attr("disabled",true);
				}
				setTimeout(function(){//当图片运动完以后让按钮恢复点击
					prev.attr("disabled",false);
				},500)
				
				// 运动前就操作dom
				// 最后一张图片加到最前面，并改变ul的translate为一个li的宽度的负值
				// 例如点击前，用户看到的是（）里的内容
				// 点击前       (1) 2 3 4 5    translate=0
				// 操作dom后  5 (1) 2 3 4      translate=-li.w
				// 开始运动前 5 (1) 2 3 4      translate=-li.w
				// 运动后       (5) 1 2 3 4    translate=0
				// 第二次点击
				// 点击前       (5) 1 2 3 4    translate=0
				// 操作dom后  4 (5) 1 2 3      translate=-li.w
				// 开始运动前 4 (5) 1 2 3      translate=-li.w
				// 运动后       (4) 5 1 2 3    translate=0
				contain.prepend(slideLi.last());
				contain.css("transition","none");
				contain.css("transform","translateX(-"+slideLi.width()+"px)");
				setTimeout(function(){
					contain.css("transition",".5s");
					contain.css("transform","translateX(0px)");
				},30)
				
				console.log(num)
				setPoint(num);
			})
	
			/*轮播函数*/
			function autoPlay() {
				slideLi = $(".contain .item");//点击完成重新获取页面图片排序
				num++;
				if(num >= slideLi.length){
					num = 0
				}
				
				if(temp){//点击的时候先判断temp是否为true，是就让按钮的点击失效，防止双击出现bug
					next.attr("disabled",true);
				}
				setTimeout(function(){//当图片运动完以后让按钮恢复点击
					next.attr("disabled",false);
				},500)
				
				//点击右边按钮的时候先让ul移动一个li宽度的距离，当一张图片运动完成时进入延时器
				contain.css("transition",".5s");
				contain.css("transform","translateX(-"+slideLi.width()+"px)");
				// 运动后才操作dom
				// 点右
				// 点击前       (1) 2 3 4 5    translate=0
				// 开始运动前   (1) 2 3 4 5    translate=0
				// 运动后     1 (2) 3 4 5      translate=-li.w
				// 操作dom后    (2) 3 4 5 1    translate=0
				// 第二次点击
				// 点击前       (2) 3 4 5 1    translate=0
				// 开始运动前   (2) 3 4 5 1    translate=0
				// 运动后     2 (3) 4 5 1      translate=-li.w
				// 操作dom后    (3) 4 5 1 2    translate=0
				
				//此时一张图片已经完成运动，延时器开启，取消过渡属性瞬间将ul的transtale值拉回零，这个时候在append第一张到最后一张
				setTimeout(function(){
					contain.css("transition","none");
					contain.css("transform","translateX(0px)");
					contain.append(slideLi.first());
				},500)
				
				setPoint(num);
			}
	
			timer = setInterval(autoPlay, 2000);
	
			/*----创建轮播导航小点----*/
			var oLi = '';
			for(var i = 0; i < slideLi.length; i++) {
				if(i == 0) {
					oLi += '<li class="active"></li>';
				} else {
					oLi += '<li></li>';
				}
				pointUl.html(oLi);
			}
			var sildePoint = $("#slider .slider-point li");
	
			sildePoint.on('click', function() {
				var index = $(this).index();
				contain.css("transition",'.5s');
				contain.css("transform", "translateX(" + -(index * slideLi.width()) + "px)");
				setPoint(index);
				num = index;
			})
	
			/*设置轮播小点背景*/
			function setPoint(index) {
				for(var i = 0; i < sildePoint.length; i++) {
					sildePoint.eq(i).removeClass("active");
				}
				sildePoint.eq(index).addClass("active");
			}
	
			slide.on('mouseover', function() {
				clearInterval(timer);
			});
			slide.on('mouseout', function() {
				timer = setInterval(autoPlay, 2000);
			})
		})();
		/*------------主轮播结束-----------------*/

		/*----------------------------------数据------------------------------------------*/


		/*---------------头部导航---------------*/
		(function(){
			var headerData = aData.headerMenu;
			var header = document.getElementById("header");
			var headMenu = header.getElementsByClassName("header-menu")[0];
			var menuStr = '';
			for(var i = 0; i < headerData.title.length; i++) {
				menuStr += '<li>' +
					'<a href="detail.html" class="hvr-pulse-shrink">' + headerData.title[i] + '</a>' +
					'<div class="content">' +
					'<ul class="goods-list">'
				for(var j = 0; j < 4; j++) {
					menuStr += '<li class="item">' +
									'<figure class="prod-img">' +
									'<img src="./' + headerData.image[i] + '">' +
									'</figure>' +
									'<p class="name">' + headerData.name + '</p>' +
									'<span class="price">' + headerData.price + '</span>' +
								'</li>';
				}
	
				menuStr += '</ul>' +
					'</div>' +
					'</li>';
			}
			headMenu.innerHTML = menuStr;
		})();
		/*---------------头部导航结束---------------*/
		
		

		/*---------------小米明星单品---------------*/
		(function(){
			var skuData = aData.starSingleProduct;
			var sku = document.getElementById("sku");
			var skuBox = sku.getElementsByClassName("m-s2")[0];
			var skuStr = '';
			for(var i = 0; i < skuData.title.length; i++) {
				skuStr += '<div class="m-slide-item">' +
					'<ul class="m-cols m-col-5">'
				for(var j = 0; j < 5; j++) {
					skuStr += '<li class="col sku-item'+skuData.classes[j]+'">' +
									'<dl class="row">' +
									'<dt><img src="./' + skuData.image[j] + '"></dt>' +
									'<dd class="name">' + skuData.name + '</dd>' +
									'<dd class="desc">' + skuData.desc + '</dd>' +
									'<dd class="price">' + skuData.price + '</dd>' +
									'</dl>' +
								'</li>';
				}
				skuStr += '</ul>' +
					'</div>';
			}
			skuBox.innerHTML = skuStr;
		})();
		/*---------------小米明星单品结束---------------*/

		/*-------------智能硬件----------------*/
		(function(){
			var hard = document.getElementById('hard');
			var hardData = aData.intelligent;
			var hardBox = hard.getElementsByClassName('span16')[0];
			var hardUl = hardBox.getElementsByClassName("m-cols")[0];
			var harStr = '';
			for(var i = 0; i < hardData.image.length; i++) {
				harStr += '<li class="col '+hardData.classes[i]+'">'
				for(var j = 0; j < 2; j++) {
					harStr += '<div class="row">' +
								'<span class="tip blue">' + hardData.status[1] + '</span>' +
								'<dl>' +
								'<dt><img src="./' + hardData.image[i] + '"></dt>' +
								'<dd class="name">' + hardData.name + '</dd>' +
								'<dd class="desc">' + hardData.desc + '</dd>' +
								'<dd class="price">' + hardData.price + '</dd>' +
								'</dl>' +
							'</div>'
				}
				harStr += '</li>';
			}
			hardUl.innerHTML = harStr;
		})();
		/*------------智能硬件结束-------------*/

		/*--------------搭配开始--------------*/
		(function(){
			var matchData = aData.match;
			var match = document.getElementById('match');
			var matchBox = match.getElementsByClassName('m-s4')[0];
			var matStr = '';
			for(var i = 0; i < matchData.contents.dapei.length; i++) {
				matStr += '<div class="m-slide-item">' +
					'<ul class="m-cols m-col-4">'
				for(var j = 0; j < matchData.contents.dapei.length; j++) {
					matStr += '<li class="col '+matchData.classes[j]+'">' +
								'<div class="row" content="' + matchData.evaluate + '" from="来自于米米小aa 的评价">' +
								'<span class="tip orange">' + matchData.status[0] + '</span>' +
								'<dl>' +
								'<dt><img src="./' + matchData.image[j] + '"></dt>' +
								'<dd class="name">' + matchData.name + '</dd>' +
								'<dd class="price">' + matchData.price + '</dd>' +
								'<dd class="cmt">' + matchData.cmt + '</dd>' +
								'</dl>' +
								'</div>' +
								'<div class="row" content="' + matchData.evaluate + '" from="来自于米米小aa 的评价">' +
								'<span class="tip blue">' + matchData.status[1] + '</span>' +
								'<dl>' +
								'<dt><img src="./' + matchData.image[j + 1] + '"></dt>' +
								'<dd class="name">' + matchData.name + '</dd>' +
								'<dd class="price">' + matchData.price + '</dd>' +
								'<dd class="cmt">' + matchData.cmt + '</dd>' +
								'</dl>' +
								'</div>' +
							'</li>'
				}
				matStr += '</ul>' +
					'</div>';
			}
			matchBox.innerHTML = matStr;
		})();
		/*-------------搭配结束------------*/

		/*-------------配件开始------------*/
		(function(){
			var partData = aData.match;
			var parts = document.getElementById("parts");
			var partBox = parts.getElementsByClassName('m-s4')[0];
			var parStr = '';
			for(var i = 0; i < partData.contents.dapei.length; i++) {
				parStr += '<div class="m-slide-item">' +
					'<ul class="m-cols m-col-4">'
				for(var j = 0; j < partData.contents.dapei.length; j++) {
					parStr += '<li class="col '+partData.classes[j]+'">' +
								'<div class="row" content="' + partData.evaluate + '" from="来自于米米小aa 的评价">' +
								'<span class="tip orange">' + partData.status[0] + '</span>' +
								'<dl>' +
								'<dt><img src="./' + partData.image[j + 5] + '"></dt>' +
								'<dd class="name">' + partData.name + '</dd>' +
								'<dd class="price">' + partData.price + '</dd>' +
								'<dd class="cmt">' + partData.cmt + '</dd>' +
								'</dl>' +
								'</div>' +
								'<div class="row" content="' + partData.evaluate + '" from="来自于米米小aa 的评价">' +
								'<span class="tip blue">' + partData.status[1] + '</span>' +
								'<dl>' +
								'<dt><img src="./' + partData.image[j + 9] + '"></dt>' +
								'<dd class="name">' + partData.name + '</dd>' +
								'<dd class="price">' + partData.price + '</dd>' +
								'<dd class="cmt">' + partData.cmt + '</dd>' +
								'</dl>' +
								'</div>' +
							'</li>'
				}
				parStr += '</ul>' +
					'</div>';
			}
			partBox.innerHTML = parStr;
		})();
		/*------------配件开始------------*/

/*------------周边开始------------*/
		(function(){
			var ambitusDate = aData.surrounding;
			var ambitus = document.getElementById("ambitus");
			var ambitusBox = ambitus.getElementsByClassName("m-s5")[0];
			var ambStr = '';
			for(var i = 0; i < ambitusDate.contents.length; i++) {
				ambStr += '<div class="m-slide-item">' +
					'<ul class="m-cols m-col-4">'
				for(var j = 0; j < 3; j++) {
					ambStr += '<li class="col  '+ambitusDate.classes[i]+'">' +
								'<div class="row">' +
								'<span class="tip orange">' + ambitusDate.status[0] + '</span>' +
								'<dl>' +
								'<dt><img src="./' + ambitusDate.image[j] + '"></dt>' +
								'<dd class="name">' + ambitusDate.name + '</dd>' +
								'<dd class="desc">' + ambitusDate.desc + '</dd>' +
								'<dd class="price">' + ambitusDate.price + '</dd>' +
								'</dl>' +
								'</div>' +
								'<div class="row">' +
								'<span class="tip blue">' + ambitusDate.status[1] + '</span>' +
								'<dl>' +
								'<dt><img src="./' + ambitusDate.image[j + 1] + '"></dt>' +
								'<dd class="name">' + ambitusDate.name + '</dd>' +
								'<dd class="desc">' + ambitusDate.desc + '</dd>' +
								'<dd class="price">' + ambitusDate.price + '</dd>' +
								'</dl>' +
								'</div>' +
							'</li>';
				}
	
				ambStr += '<li class="col  '+ambitusDate.classes[i]+'">' +
							'<div class="row">' +
							'<span class="tip orange">' + ambitusDate.status[0] + '</span>' +
							'<dl>' +
							'<dt><img src="./' + ambitusDate.image[4] + '"></dt>' +
							'<dd class="name">' + ambitusDate.name + '</dd>' +
							'<dd class="desc">' + ambitusDate.desc + '</dd>' +
							'<dd class="price">' + ambitusDate.price + '</dd>' +
							'</dl>' +
							'</div>' +
							'<div class="row row_half small-intro">' +
							'<div class="small-introL">' +
							'<b>' + ambitusDate.introL.name + '</b>' +
							'<small>' + ambitusDate.introL.price + '</small>' +
							'</div>' +
							'<div class="small-introR">' +
							'<img src="./' + ambitusDate.image[7] + '">' +
							'</div>' +
							'</div>' +
							'<div class="row row_half scan-more">' +
							'<div class="scan-moreL">' +
							'<b>浏览更多</b>' +
							'<small>热门</small>' +
							'</div>' +
							'<div class="scan-moreR icon"></div>' +
							'</div>' +
							'</li>' +
							'</ul>' +
							'</div>';
			}
			ambitusBox.innerHTML = ambStr;
		})();
		/*-------------周边结束-------------*/

		/*---------------为你推荐---------------*/
		(function(){
			var recoData = aData.recommend;
			var recommend = document.getElementById("recommend");
			var recoBox = recommend.getElementsByClassName("m-s2")[0];
			var recoStr = '';
			for(var i = 0; i < recoData.title.length; i++) {
				recoStr += '<div class="m-slide-item">' +
					'<ul class="m-cols m-col-5">'
					for(var j = 0; j < 5; j++) {
						recoStr += '<li class="col sku-item  '+recoData.classes[j]+'">' +
										'<dl class="row">' +
										'<dt><img src="./' + recoData.image[j] + '"></dt>' +
										'<dd class="name">' + recoData.name + '</dd>' +
										'<dd class="price">' + recoData.price + '</dd>' +
										'<dd class="cmt">' + recoData.cmt + '</dd>' +
										'</dl>' +
									'</li>';
					}
					recoStr += '</ul>' +
							'</div>';
			}
			recoBox.innerHTML = recoStr;
		})();
		/*---------------为你推荐结束---------------*/

		/*---------------热评产品---------------*/
		(function(){
			var commData = aData.comment;
			var comment = document.getElementById("comment");
			var commBox = comment.getElementsByClassName("m-col-4")[0];
			var commStr = '';
			for(var i = 0; i < commData.image.length; i++) {
				commStr += '<li class="col ">' +
								'<div class="row">' +
								'<img src="./' + commData.image[i] + '">' +
								'<div class="content">' +
								'<div class="cmt">' +
								'' + commData.cmt[i] + '' +
								'</div>' +
								'<div class="from">' + commData.from + '</div>' +
								'<a href="#" class="name">' + commData.name[i] + '</a>' +
								'<a href="#" class="price">' + commData.price + '</a>' +
								'</div>' +
								'</div>' +
							'</li>';
			}
			commBox.innerHTML = commStr;
		})();
		/*---------------热评产品结束---------------*/

		/*---------------内容区---------------*/
		(function(){
			var contData = aData.content;
			var content = document.getElementById("content");
			var contBox = content.getElementsByClassName("m-col-4")[0];
			var conStr = '';
			for(var i=0;i<contData.image.length;i++){
				conStr += '<li class="col '+contData.classes[i]+'">'+
								'<div class="row">'+
									'<dl>'+
										'<dt class="type">'+contData.type[i]+'</dt>'+
										'<dd class="name">'+contData.name[i]+'</dd>'+
										'<dd class="desc">'+contData.desc[i]+'</dd>'+
										'<dd class="status"></dd>'+
										'<dd><img src="./'+contData.image[i]+'"></dd>'+
									'</dl>'+
								'</div>'+
							'</li>';
			}
			contBox.innerHTML = conStr;
		})();
		/*---------------内容区结束---------------*/
		
		
		/*---------------视频区---------------*/
		(function(){
			var videoData = aData.video;
			var video = document.getElementById("video");
			var viBox = video.getElementsByClassName("m-col-4")[0];
			var viStr = '';
			for(var i=0;i<videoData.video.length;i++){
				viStr += '<li class="col ">'+
							'<div class="row">'+
								'<div class="video">'+
									'<label class="play-btn" for="video-switch"></label>'+
									'<img src="./'+videoData.video[i]+'">'+
								'</div>'+
								'<div class="content">'+
									'<p class="name">'+
										'<a href="#">'+videoData.name[i]+'</a>'+
									'</p>'+
									'<p class="desc">'+videoData.desc[i]+'</p>'+
								'</div>'+
							'</div>'+
						'</li>';
			}
			viBox.innerHTML = viStr;
		})();
		/*---------------视频区结束---------------*/


		/*---------------返回顶部---------------*/
		(function(){
			var backTop = $("#backTop");
			var iH = window.innerHeight;
			backTop.css("top",iH-100 + 'px');
			$(window).resize(function(){
				var iH = window.innerHeight;
				backTop.css("top",iH-100 + 'px');
			});
			$(document).scroll(function(){
				if(document.body.scrollTop>=800){
					backTop.css({"right":"0px","transform":"rotateZ(0deg)"});
				}else{
					backTop.css({"right":"-100px","transform":"rotateZ(90deg)"});
				}
			})
			
			var timer = null;
			backTop.click(function(){
				$('html,body').stop().animate({
					scrollTop:0
				},500)
			})
		})();
		/*---------------返回顶部结束---------------*/

		
		/*---------------搜索数据---------------*/
		(function(){
			
			var vm = new Vue({
				el:"#app1",
				data:{
					list:aData.headerRight.search,
					val:""
				},
				methods:{
					searchVal(ev){
						this.val = ev.target.firstChild.innerHTML;
					},
				}
			})
			
		})();
		/*---------------搜索数据结束---------------*/
		
		/*-----------------判断滚动条的距离动态添加animite-----------------*/
		(function(){
			$(document).scroll(function(){
				if($(document).scrollTop() >= 600 && $(document).scrollTop() <= 700){
					$("#sku li").addClass("animated flip");
				}else if($(document).scrollTop() >= 1200 && $(document).scrollTop() <= 1900){
					$("#hard .span16 .col .row").addClass("animated jello");
				}else if($(document).scrollTop() >= 1800 && $(document).scrollTop() <= 2500){
					$("#match .span16 .col .row").addClass("animated swing");
				}else if($(document).scrollTop() >= 2600 && $(document).scrollTop() <= 3000){
					$("#parts .span16 .col").addClass("animated rubberBand");
				}else if($(document).scrollTop() >= 3300 && $(document).scrollTop() <= 3700){
					$("#ambitus .span16 .col").addClass("animated lightSpeedIn");
				}else if($(document).scrollTop() >= 3900 && $(document).scrollTop() <= 4100){
					$("#recommend .m-box .col").addClass("animated tada");
				}else if($(document).scrollTop() >= 4400 && $(document).scrollTop() <= 4600){
					$("#comment .m-box .col").addClass("animated rotateIn");
				}else if($(document).scrollTop() >= 4800 && $(document).scrollTop() <= 5000){
					$("#content .m-box .col").addClass("animated wobble");
				}else if($(document).scrollTop() >= 5300 && $(document).scrollTop() <= 5600){
					$("#video .m-box .col").addClass("animated zoomInDown");
				}
			})
		})()
		/*-----------------动态添加animite结束-----------------*/
		
	})

})