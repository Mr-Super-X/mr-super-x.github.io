$(function(){
	$(".btn").click(function(){
		var reg1 = /^1(3|4|5|7|8)\d{9}$/i;
		var reg2 = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,21}$/;
		if(!$(".phone").val() || !$(".pwd").val()){
			$(".warning-info").css("opacity","1").html("请输入用户名和密码！");
		}else if(reg1.test($(".phone").val()) && reg2.test($(".pwd").val())){
			alert("登录成功!");
			window.location.href = "login.html";
		}
	})
	
	$(".phone").on("focus",function(){
		$(".warning-info").css("opacity","0");
	})
	
	$("#reg .phone").on("blur",function(){
		var reg = /^1(3|4|5|7|8)\d{9}$/i;//验证手机正则(输入前7位至11位)
		if(reg.test($(".phone").val())){
			$(this).css("border-color","#ccc")
		}else{
			if($(this).val()){
				$(".warning-info").css("opacity","1").html("手机号码格式错误，请重新输入！");
			}else{
				$(".warning-info").css("opacity","1").html("手机号不能为空！");
			}
			$(this).css("border-color","red");
		}
	})
	
	$(".pwd").on("focus",function(){
		$(".warning-info").css("opacity","0");
	})
	
	$(".pwd").on("blur",function(){
		var reg = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,21}$/; 
		if(reg.test($(".pwd").val())){
			$(this).css("border-color","#ccc")
		}else{
			if($(this).val()){
				$(".warning-info").css("opacity","1").html("密码格式错误，请重新输入！");
			}else{
				$(".warning-info").css("opacity","1").html("密码不能为空！");
			}
			
			$(this).css("border-color","red");
		}
	})
})