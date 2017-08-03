function touchSwipe(obj,dir,fn){
	obj.addEventListener("touchstart",start);
	obj.addEventListener("touchend",end);
	var startX = null;
	var startY = null;
	var endX = null;
	var endY = null;
	
	function start(ev){
		ev = ev.changedTouches[0];
		startX = ev.pageX;
		startY = ev.pageY;
	}
	
	function end(ev){
		ev = ev.changedTouches[0];
		endX = ev.pageX;
		endY = ev.pageY;
		
		if(Math.abs(endX - startX) > Math.abs(endY - startY)){//判断左右滑动
			if(endX - startX > 0){
				if(dir == "right"){
					typeof fn == "function" && fn();
				}
			}
			if(endX - startX < 0){
				if(dir == "left"){
					typeof fn == "function" && fn();
				}
			}
		}
					
		if(Math.abs(endY - startY) > Math.abs(endX - startX)){//判断上下滑动
			if(endY - startY > 0){
				if(dir == "down"){
					typeof fn == "function" && fn();
				}
			}
			if(endY - startY < 0){
				if(dir == "up"){
					typeof fn == "function" && fn();
				}
			}
		}
		
		if(startX == endX && startY == endY){//点击
			if(dir == "tap"){
				typeof fn == "function" && fn();
			}
		}
	}
}
