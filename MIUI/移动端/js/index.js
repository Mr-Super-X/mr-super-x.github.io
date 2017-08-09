$(function(){
	/*--------swiper初始化轮播--------*/
	function swiper(){
		var swiper = new Swiper('.show .swiper-container', {
		    pagination: '.swiper-pagination',
		    spaceBetween: 30,
		    loop: true,
		    autoplay:2000,
		    autoplayDisableOnInteraction : false,
		});
	}
	swiper();
	/*--------轮播结束--------*/
	
	
	/*----------首页导航页切换-----------*/
	$("#header .nav li").tap(function(){
		$(this).children("span").addClass("active");
		$(this).siblings().children("span").removeClass("active");
		$(".pages").eq($(this).index()).addClass("show").siblings().removeClass("show");
		swiper();
	})
	/*----------首页导航页切换结束-----------*/
	
	
	/*跳转登录页面*/
	$("#index #login").tap(function(){
		window.location.href = "login.html";
	})
	$("#shopping .go-login").tap(function(){
		window.location.href = "login.html";
	})
	$("#personal .login-text").tap(function(){
		window.location.href = "login.html";
	})
	
	
	
	/*-----分类页侧边导航跳转对应标题-----*/
	$("#classify .left-nav li").tap(function(){
		$(this).addClass("active").siblings().removeClass("active");
		$("html,body").scrollTop($(this).index()*$("#classify .right-content section").height());
	})
	
	
	
	
	/*------------固定导航------------*/
	$("#foot-nav li").tap(function(){
		$(".wraper").eq($(this).index()).addClass("dis").siblings().removeClass("dis");
		$(this).addClass("active").siblings().removeClass("active");
		$("html,body").scrollTop(0);
	})
	/*------------固定导航------------*/
	
	
	
	
	
})