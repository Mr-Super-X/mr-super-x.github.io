$(function(){
	/*--------轮播--------*/
	var swiper = new Swiper('.swiper-container', {
	    pagination: '.swiper-pagination',
	    slidesPerView: 1,
	    paginationClickable: true,
	    spaceBetween: 30,
	    loop: true,
	    autoplay:2000
	});
	/*--------轮播结束--------*/
	
	
	
	
	/*------------固定导航------------*/
	$("#foot-nav li").tap(function(){
		$(".wraper").eq($(this).index()).addClass("dis").siblings().removeClass("dis");
		$(this).addClass("active").siblings().removeClass("active")
	})
})