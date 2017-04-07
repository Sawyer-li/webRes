//JavaScript Document
function $( v ){
	if( typeof v === 'function' ){
		window.onload = v;
	} else if ( typeof v === 'string' ) {
		return document.getElementById(v);
	} else if ( typeof v === 'object' ) {
		return v;
	}
}
/*---        获取documnet样式参数函数        ---*/
function getStyle( obj, attr ){
	return obj.currentStyle ? obj.currentStyle[attr] : getComputedStyle( obj )[attr];
}
/*---        小方块移动函数        ---*/
function domove(obj,dir,target,attr){
	dir = parseInt(getStyle( obj, attr )) > target ? -dir : dir;
	clearInterval(obj.time);
	obj.time=setInterval(function(){
		 var speed = parseInt(getStyle(obj,attr))+dir;
		if(speed >= target && dir > 0||speed < target && dir < 0){
			speed = target;
		}
		if ( speed == target ) {
			clearInterval( obj.timer );
		}
		obj.style[attr] = speed+'px';
	},50);
}
/*---        抖动函数        ---*/
function shake ( obj, attr, endFn ) {
	if(turnoff ==1){
	pos = parseInt( getStyle(obj, attr) );
	}
	var arr = [];			// 20, -20, 18, -18 ..... 0
	var num = 0;
	var timer = null;
	turnoff=0;	
	for ( var i=20; i>0; i-=2 ) {
		arr.push( i, -i );
	}
	arr.push(0);
		
	clearInterval( obj.shake );
	obj.shake = setInterval(function (){
		obj.style[attr] = pos + arr[num] + 'px';
		num++;
		if ( num === arr.length ) {
			clearInterval( obj.shake );
			endFn && endFn();
		}
	}, 50);
}
function opracity(obj,dir,target,endFn){
	clearInterval(obj.timer1);
	obj.timer1=setInterval(function(){
		 	var speed = parseFloat(getStyle(obj,'opacity'))+dir;
		 	if(dir>0&&speed >= target||dir<0&&speed <= target){
		 		speed = target; 
		 		clearInterval(obj.timer1);
			 }
			 obj.style['opacity'] = speed;
		},80);
	endFn && endFn();
}
function getPos(obj){
	 var pos ={left:0,top:0};
	 while(obj){
		 pos.top +=obj.offsetTop;
		 pos.left +=obj.offsetLeft;
		 obj=obj.offsetParent;
	 }
	 return pos;
}
function bind(obj, evname, fn) {
	if (obj.addEventListener) {
		obj.addEventListener(evname, fn, false);
	} else {
		obj.attachEvent('on' + evname, function() {
			fn.call(obj);
		});
	}
}
function drag(odiv){
	odiv.onmousedown = function(ev){
		var ev = ev||event;
		var disx = ev.clientX - this.offsetLeft;
		var disy = ev.clientY - this.offsetTop;
		if ( odiv.setCapture ) {
			odiv.setCapture();
		}
	 	document.onmousemove = function(ev){
	 		var ev = ev||event;
			odiv.style.left = ev.clientX - disx+'px'; 
			odiv.style.top = ev.clientY - disy+'px'; 		
	 	}
	 	document.onmouseup = function(){
	 		document.onmousemove = null;
	 			if ( odiv.setCapture ){
					odiv.setCapture();
				}
	 	}
	 	return false;
	}	
}
function hasClass(ele, cls) {
    return ele.className.match(new RegExp('(\\s|^)' + cls + '(\\s|$)'));
}
  
function addClass(ele, cls) {
    if (!hasClass(ele, cls)) {
        ele.className += ' ' + cls;
    }
}
  
function removeClass(ele, cls) {
    if (hasClass(ele, cls)) {
        var reg = new RegExp('(\\s|^)' + cls + '(\\s|$)'),
            newClass = ele.className.replace(reg, ' ');
        ele.className = newClass.replace(/^\s+|\s+$/g, '');
    }
}


function startMove(obj, json, fn){
			clearInterval(obj.timer);
			obj.timer = setInterval(function(){
				var bStop=true;  //这一次运动所有值都到达
				for(var attr in json){
					//取当前值
					var iCur = 0;
					if(attr == 'opacity'){
						iCur = parseInt(parseFloat(getStyle(obj,attr))*100);
					}else{
						iCur = parseInt(getStyle(obj,attr));	
					}
					//计算速度
					var speed=(json[attr]-iCur)/3;
					var speed=speed>0?Math.ceil(speed):Math.floor(speed);
					//检测停止
					if(iCur!=json[attr]){
						bStop=false; 
					}
					if(attr == 'opacity'){
						obj.filter = 'alpha(opacity:'+(iCur+speed)+')';
						obj.style.opacity = (iCur+speed)/100;
					}else{
						obj.style[attr]=iCur+speed+'px';
					}
					if(bStop == true){
						clearInterval(obj.timer);
						if(fn){
							fn();
						}
					}
				} 
			},50);
		}	
