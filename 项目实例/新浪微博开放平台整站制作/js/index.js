window.onload = function(){
	var  jnav = document.getElementsByClassName("nav")[0];
	var ali = jnav.children;
	var hl1 = document.getElementById("nav_hidden_layer1");
	var hl2 = document.getElementById("nav_hidden_layer2");
	var turnoff = 0;
	var pste = document.getElementsByClassName("poster");
	var bs = document.getElementsByClassName("banner_select")[0];
	var bst = bs.getElementsByTagName("a");
	var lastturnoff = 2;
		ali[0].onmouseenter = function(){
			hl1.style.display = "block";
			startMove(hl1,{"height":100});
		}
		ali[0].onmouseleave = function(){
			hl1.style.height = "0";
			hl1.style.display = "none";
		}
		ali[1].onmouseenter = function(){
			hl2.style.display = "block";
			startMove(hl2,{"height":100});
		}
		ali[1].onmouseleave = function(){
			hl2.style.height = "0";
			hl2.style.display = "none";
		}
		for(var i=0;i<bst.length;i++){
			bst[i].index = i;	
			bst[i].onclick = function(){
				switchs(this.index,pste,bst,lastturnoff);
				turnoff=this.index;
				lastturnoff = turnoff; 
			}
		}
		setInterval(function(){
			switchs(turnoff,pste,bst,lastturnoff);
			lastturnoff = turnoff; 
			turnoff++;
			if(turnoff==3){
				turnoff=0;
			}
		},5000);
}
function switchs(turnoff,pst,bsa,lastto){
	switch(turnoff){
				case 0:
					startMove(pst[lastto],{"opacity":0});
					bsa[lastto].style.color = "#0463b6";
					bsa[turnoff].style.color = "#5db5ec";
					pst[0].style.marginTop ="0px";
					startMove(pst[turnoff],{"opacity":100});
					break;
				case 1:
					startMove(pst[lastto],{"opacity":0});
					bsa[lastto].style.color = "#0463b6";
					bsa[turnoff].style.color = "#5db5ec";
					pst[0].style.marginTop ="-350px";
					startMove(pst[turnoff],{"opacity":100});
					break;
				case 2:
					startMove(pst[lastto],{"opacity":0});
					bsa[lastto].style.color = "#0463b6";
					bsa[turnoff].style.color = "#5db5ec";
					pst[0].style.marginTop ="-700px";
					startMove(pst[turnoff],{"opacity":100});
					break;
			}
}
