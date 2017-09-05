/**
 * Created by Administrator on 2016/4/13.
 */
$(document).ready(function () {
    //鼠标划入显示APP下载页面
    $(".nav_top .nav_list .nav_list_detail li a.app,.nav_top .app_download").hover(function () {
       $(".nav_top .app_download").css("display","block");
    },function () {
        $(".nav_top .app_download").css("display","none");
    });

    var mywidth=document.documentElement.clientWidth*0.5||document.body.clientWidth*0.5;
    $(".carousel .images").css({"left":mywidth,"margin-left":"-960px"});
    var clone=$(".carousel .images li").first().clone();
    $(".carousel .images").append(clone);
    var i=0;
    var size=$(".carousel .images li").size();
    // 点击向左轮播的函数
    $(".carousel .images_btn .btn_l").click(function () {
        i--;
        if(i==-1){
            $(".carousel .images").css({"left":mywidth-(size-1)*1920,"margin-left":"-960px"});
            i=size-2;
        }
        $(".carousel .images").stop().animate({"left":mywidth-i*1920,"margin-left":"-960px"});
        $(".carousel .images_nav li").eq(i).addClass("on").siblings().removeClass("on");
    });
    //  点击向右轮播的函数
    $(".carousel .images_btn .btn_r").click(function () {
        i++;
        if(i==size){
            $(".carousel .images").css({"left":mywidth,"margin-left":"-960px"});
            i=1;
        }
        $(".carousel .images").stop().animate({"left":mywidth-i*1920,"margin-left":"-960px"});
        if(i==size-1){
            $(".carousel .images_nav li").eq(0).addClass("on").siblings().removeClass("on");
        }else{
            $(".carousel .images_nav li").eq(i).addClass("on").siblings().removeClass("on");
        }
    });
    //向右轮播函数
    function moveR() {
        i++;
        if(i==size){
            $(".carousel .images").css({"left":mywidth,"margin-left":"-960px"});
            i=1;
        }
        $(".carousel .images").stop().animate({"left":mywidth-i*1920,"margin-left":"-960px"});
        if(i==size-1){
            $(".carousel .images_nav li").eq(0).addClass("on").siblings().removeClass("on");
        }else{
            $(".carousel .images_nav li").eq(i).addClass("on").siblings().removeClass("on");
        }
    }
    //  定时自动向右轮播函数
    var t=setInterval(function () {
        moveR();
    },3000);
    //  鼠标滑过白条导航条
    $(".carousel .images_nav li").hover(function () {
        var index=$(this).index();
        $(this).text(index+1);
    },function () {
        $(this).text("");
    });
    //鼠标点击白条导航条
    $(".carousel .images_nav li").click(function () {
        var index=$(this).index();
        i=index;
        $(".carousel .images").stop().animate({"left":mywidth-i*1920,"margin-left":"-960px"});
        $(this).addClass("on").siblings().removeClass("on");
    });
    //  鼠标悬停停止轮播，移开继续自动定时轮播函数
    $(".carousel").hover(function () {
        clearInterval(t);
    }, function() {
        t = setInterval(function () {
            moveR();
        }, 3000)
    });
    //ZEALER出品视频鼠标滑过图片效果
    $(".wrap1 .video .video_detail ul li").hover(function () {
        $(this).find(".left_line").stop().animate({"left":"120px","opacity":1},300);
        $(this).find(".right_line").stop().animate({"right":"120px","opacity":1},300);
        $(this).find(".play").stop().animate({"top":0,"opacity":1},300);
    },function () {
        $(this).find(".left_line").stop().animate({"left":"90px","opacity":0},300);
        $(this).find(".right_line").stop().animate({"right":"90px","opacity":0},300);
        $(this).find(".play").stop().animate({"top":"20px","opacity":0},300);
    });
    //维修项目点击出现、消失选择表单的实现
    $(".wrap3 .sec_fix .fix .fix_form .fix_form_submit dl.fault dt").click(function (event) {
        $(this).next().slideToggle(250);
        event.stopPropagation();
    });
    $(".wrap3 .sec_fix .fix .fix_form .fix_form_submit dl.fault dd div").click(function () {
        var get_text=$(this).text();
        $(this).parent().slideUp(250,function () {
            $(this).prev().text(get_text);
        });
    });
    $(window).click(function (event) {
        var t=$(this).hasClass("fault");
        if(!t){
            $(".wrap3 .sec_fix .fix .fix_form .fix_form_submit dl.fault dd").slideUp(250);
        }
        event.stopPropagation();
    });
    //选择机型点击出现，消失选择表单的实现
    $(".wrap4 dl.chose_brand dt").click(function (event) {
        var dd1=$(this).next().css("display");
        if(dd1=="none"){
            $(this).css({"background-image":"url(images/new_icons.png)","background-position":"292px -591px",
                "background-repeat":"no-repeat"});
        }else{
            $(this).css({"background-image":"url(images/new_icons.png)","background-position":"292px -552px",
                "background-repeat":"no-repeat"});
        }
        $(this).next().slideToggle(250);
        $(".wrap4 dl.chose_type dd>div").slideUp(250,function () {
            $(".wrap4 dl.chose_type dt").css({"background-image":"url(images/new_icons.png)","background-position":"292px -552px",
                "background-repeat":"no-repeat"});
        });
        event.stopPropagation();
    });
    $(".wrap4 dl.chose_brand dd div").click(function (event) {
        var get_text=$(this).text();
        $(this).parent().slideUp(250,function () {
            $(this).prev().text(get_text).css({"background-image":"url(images/new_icons.png)","background-position":"292px -552px",
                "background-repeat":"no-repeat"});
            $(".wrap4 dl.chose_type dt").text("请选择型号");
        });
    });
    $(".wrap4 dl.chose_type dt").click(function (event) {
        var brand_dt=$(".wrap4 dl.chose_brand dt").text();
        if(brand_dt=="Apple"){
            var dd2=$(".wrap4 dl.chose_type dd .iphone").css("display");
            if(dd2=="none"){
                $(this).css({"background-image":"url(images/new_icons.png)","background-position":"292px -591px",
                    "background-repeat":"no-repeat"});
            }else{
                $(this).css({"background-image":"url(images/new_icons.png)","background-position":"292px -552px",
                    "background-repeat":"no-repeat"});
            }
            $(".wrap4 dl.chose_type dd .iphone").slideToggle(250).siblings().hide();
        }else{
            var dd2=$(".wrap4 dl.chose_type dd .sam").css("display");
            if(dd2=="none"){
                $(this).css({"background-image":"url(images/new_icons.png)","background-position":"292px -591px",
                    "background-repeat":"no-repeat"});
            }else{
                $(this).css({"background-image":"url(images/new_icons.png)","background-position":"292px -552px",
                "background-repeat":"no-repeat"});
        }
            $(".wrap4 dl.chose_type dd .sam").slideToggle(250).siblings().hide();
        }
        event.stopPropagation();
    });
    $(".wrap4 dl.chose_type dd div div").click(function () {
        var get_text=$(this).text();
        $(this).parent().slideUp(250,function () {
            $(this).parent().prev().text(get_text).css({"background-image":"url(images/new_icons.png)",
                "background-position":"292px -552px","background-repeat":"no-repeat"});
        });
    });
    $(window).click(function () {
        var t=$(this).hasClass("chose_brand");
        if(!t){
            $(".wrap4 dl.chose_brand dd").slideUp(250,function () {
                $(".wrap4 dl.chose_brand dt").css({"background-image":"url(images/new_icons.png)","background-position":"292px -552px",
                    "background-repeat":"no-repeat"});
            });
        }
        event.stopPropagation();
    });
    $(window).click(function () {
        var t=$(this).hasClass("chose_type");
        if(!t){
            $(".wrap4 dl.chose_type dd>div").slideUp(250,function () {
                $(".wrap4 dl.chose_type dt").css({"background-image":"url(images/new_icons.png)","background-position":"292px -552px",
                    "background-repeat":"no-repeat"});
            });
        }
        event.stopPropagation();
    });
    //鼠标移动到实验室图片上时动画效果
    $(".wrap5 .lab .lab_main .lab_img").hover(function () {
        $(this).find(".img_container .list_bg").animate({"opacity":"0.7"},250);
        $(this).find(".img_container .left_line").animate({"left":"173px","opacity":"1"},250);
        $(this).find(".img_container .right_line").animate({"right":"173px","opacity":"1"},250);
        $(this).find(".img_container .play").animate({"top":"0","opacity":"1"},250);
    },function () {
            $(this).find(".list_bg").animate({"opacity":"0"},250);
            $(this).find(".left_line").animate({"left":"83px","opacity":"0"},250);
            $(this).find(".right_line").animate({"right":"83px","opacity":"0"},250);
            $(this).find(".play").animate({"top":"20","opacity":"0"},250);
    }
    );
    //返回顶部
    $(window).scroll(function () {
        var t=$(this).scrollTop();
        if(t>100){
            $(".footer .footer4").fadeIn();
        }else{
            $(".footer .footer4").fadeOut();
        }
    });
    $(".footer .footer4").click(function () {
        $("html,body").animate({"scrollTop":0},250);
    });

});
