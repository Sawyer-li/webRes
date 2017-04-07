//手写的封装库
function $(v){
	if(typeof(v) === 'function'){
		window.onload = v;
	}else if (typeof(v) === 'string'){
		return document.getElementById(v);
	}else{
		return v;
	}
}
//获取样式
function getStyle(obj, attr){
	return obj.currentStyle?obj.currentStyle(attr):getComputedStyle(obj)[attr];
}
//移动
function domove(obj,target,dir,attr){
	dir =  getStyle(obj,attr)>target? -dir: dir;
	clearInterval(obj.time);
	obj.time = setInterval(function(){
		var speed = parseInt(getStyle(obj,attr))+dir;
		if(speed>=target&&dir>0||speed<=target&&dir<0){
			speed == target;
		}
		if( speed == target ){
			clearInterval(obj.time);
		}
		obj.style[attr] = speed+"px";
	},50);


}