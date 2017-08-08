function view(){
	return{
		w:document.documentElement.clientWidth,
		h:document.documentElement.clientHeight
	}
}
//创建飞机对象
function Plane(hp,positionX,positionY,sizeX,sizeY,speed,planeImg,boomImg,score){
	this.planeHp=hp;
	this.planeX=positionX;
	this.planeY=positionY;
	this.planeSizeX=sizeX;
	this.planeSizeY=sizeY;
	this.flySpeed=speed;
	this.planeImgSrc=planeImg;
	this.boomSrc=boomImg;
	this.planeScore=score;
	this.isLive=true;
	this.planeImg=null;
	this.dieTime=1000;
	this.createPlane();
	this.flyOneStep();
}
Plane.prototype.createPlane=function(){
	this.planeImg=document.createElement('img');
	this.planeImg.src=this.planeImgSrc;
	this.planeImg.style.position='absolute';
	this.planeImg.style.left=this.planeX+'px';
	this.planeImg.style.top=this.planeY+'px';
	this.planeImg.width=this.planeSizeX;
	this.planeImg.height=this.planeSizeY;
	$('#playgame').append(this.planeImg);
}
Plane.prototype.flyOneStep=function(){
	if(!this.isLive){
		return;
	}
	this.planeY+=this.flySpeed;
	this.planeImg.style.top=this.planeY+'px';
}
function Bullet(hurt,positionX,positionY,sizeX,sizeY,bulletSpeed,imgSrc){
	this.bHurt=hurt;
	this.bX=positionX-sizeX/2;
	this.bY=positionY-sizeY;
	this.bW=sizeX;
	this.bH=sizeY;
	this.bSpeed=bulletSpeed;
	this.bImg=imgSrc;
	this.createBullet();
	this.flyBullet();
}
Bullet.prototype.createBullet=function(){
	this.bulletImg=document.createElement('img');
	this.bulletImg.src=this.bImg;
	this.bulletImg.style.position='absolute';
	this.bulletImg.style.left=this.bX+'px';
	this.bulletImg.style.top=this.bY+'px';
	this.bulletImg.width=this.bW;
	this.bulletImg.height=this.bH;
	$('#playgame').append(this.bulletImg);
}
Bullet.prototype.flyBullet=function(){
	this.bY-=this.bSpeed;
	this.bulletImg.style.top=this.bY+'px';
}
function Package(type,positionX,positionY,sizeX,sizeY,speed,imgsrc){
	this.pType=type;
	this.pgX=positionX;
	this.pgY=positionY;
	this.pgW=sizeX;
	this.pgH=sizeY;
	this.pgSpeed=speed;
	this.pgImg=imgsrc;
	this.createPackage();
	this.flyPackage();
}
Package.prototype.createPackage=function(){
	this.packImg=document.createElement('img');
	this.packImg.src=this.pgImg;
	this.packImg.className='pack';
	this.packImg.style.position='absolute';
	this.packImg.style.left=this.pgX+'px';
	this.packImg.style.top=this.pgY+'px';
	this.packImg.width=this.pgW;
	this.packImg.height=this.pgH;
	$('#playgame').append(this.packImg);
}
Package.prototype.flyPackage=function(){
	this.pgY+=this.pgSpeed;
	this.packImg.style.top=this.pgY+'px';
}
$(function(){
	var cWidth=view().w;//窗口宽度
	var cHeight=view().h;//窗口高度
	var enemies=[];//敌机数组
	var ennum=0;//敌机数量
	var bullets=[];//子弹数组
	var bnum=0;//子弹数量
	var boom=10;//炸弹数量
	var score=0;//分数
	var pasue=true;//暂停游戏
	var myPlanePositionX;//我方飞机X
	var myPlanePositionY;//我方飞机Y
	var em1Time;//生成小敌机定时器
	var em2Time;//生成中敌机定时器
	var em3Time;//生成大敌机定时器
	var emFlyTime;//敌机飞行定时器
	var bFlyTime;//子弹飞行定时器
	var pFlyTime;//礼包飞行定时器
	var bulletTime;//生成子弹定时器
	var packTime;//生成礼包定时器
	var pack;//礼包
	var over=false;//游戏结束
	var strength=0;//加强子弹
	var xsSpeed=5;//飞机飞行速度
	var mdSpeed=5;
	var lgSpeed=5;
	var xsTimer=1000;//飞机刷新频率
	var mdTimer=2000;
	var lgTimer=3000;
	var buTimer=80;//子弹刷新频率
	var gamespace=document.getElementById('playgame');
	$('#box').height(cHeight);
	//Plane(hp,positionX,positionY,sizeX,sizeY,speed,planeImg,boomImg,score)
	var myPlane=new Plane(1,472,500,56,80,0,'http://a1.qpic.cn/psb?/V149fNWB1zLBHb/V6Dhvfr5tKXTZcw2HBjPgJ93ToFK2JHsr*5ffkMTwxY!/b/dD4BAAAAAAAA&bo=OABQAAAAAAADAE0!&rf=viewer_4','img/b3.gif',0);
	function makeEn1(){//小敌机
		var mx=Math.random()*960;
	//	var e = new Plane(1,mx,-60,40,60,xsSpeed,'img/en1.png','img/b1.gif',1000);
		var e = new Plane(1,mx,-60,40,60,xsSpeed,'http://a1.qpic.cn/psb?/V149fNWB1zLBHb/uCwL070FNOJOZdsVFBF6mlSw0ZKWlxvSKLylSP9.ayk!/b/dD4BAAAAAAAA&bo=KAA8AAAAAAADADE!&rf=viewer_4','img/b1.gif',1000);
		enemies.push(e);//把敌机加到数组中
		ennum++;
	}
	function makeEn2(){//中敌机
		var mx=Math.random()*920;
	//	var e = new Plane(6,mx,-80,80,80,mdSpeed,'img/en2.png','img/b2.gif',2000);
		var e = new Plane(6,mx,-80,80,80,mdSpeed,'http://a3.qpic.cn/psb?/V149fNWB1zLBHb/0ieYmeShiDW3ukuwFFaxdd9FE3khHjHbfZrSkIVkKzM!/b/dGoBAAAAAAAA&bo=UABQAAAAAAADACU!&rf=viewer_4','img/b2.gif',2000);
		enemies.push(e);
		ennum++;
	}
	function makeEn3(){//大敌机
		var mx=Math.random()*900;
	//	var e = new Plane(12,mx,-100,100,136,lgSpeed,'img/en3.png','img/b3.gif',5000);
		var e = new Plane(12,mx,-100,100,136,lgSpeed,'http://a2.qpic.cn/psb?/V149fNWB1zLBHb/*D3mDPKeUMacdQbNkBZOoTMYMAcSCPnxU*nzgR8Aank!/b/dD8BAAAAAAAA&bo=ZACIAAAAAAADAMk!&rf=viewer_4','img/b3.gif',5000);

		enemies.push(e);
		ennum++;
	}
	function enemiesFly(){//敌机飞行
		for(var i=0;i<ennum;i++){
			if(!enemies[i].isLive){//判断敌机状态，如果敌机已死
				if((enemies[i].planeImg.src).indexOf(enemies[i].boomSrc)==-1){//判断图片是否已变化
					enemies[i].planeImg.src=enemies[i].boomSrc;
				}
				enemies[i].dieTime-=50;
				if(enemies[i].dieTime<=0){//如果该敌机消失时间已到
					gamespace.removeChild(enemies[i].planeImg);
					enemies.splice(i,1);
					ennum--;
				}
			}
			else if(enemies[i].planeY>590){//超出底部
				gamespace.removeChild(enemies[i].planeImg);
				enemies.splice(i,1);
				ennum--;
			}
			else{
				enemies[i].flyOneStep();
			}
		}
	}
	function bulletsFly(){//子弹飞行
		for(var j=0;j<bnum;j++){
			var bTop=parseInt(bullets[j].bulletImg.style.top);
			if(bTop<=0){//超出顶部
				gamespace.removeChild(bullets[j].bulletImg);
				bullets.splice(j,1);
				bnum--;
			}
			else{
				bullets[j].flyBullet();
			}
		}
		var ex,ey;
		var bx,by;
		for(var k=0;k<ennum;k++){//循环敌机
			ex=enemies[k].planeImg.offsetLeft;
			ey=enemies[k].planeImg.offsetTop;
			if(!enemies[k].isLive){//如果敌机已死，跳过此循环
				continue;
			}
			if(myPlanePositionX+myPlane.planeSizeX>ex&&myPlanePositionX<ex+enemies[k].planeSizeX&&myPlanePositionY+myPlane.planeSizeY>ey&&myPlanePositionY<ey+enemies[k].planeSizeY){//判断敌机碰撞我方飞机
				myPlane.planeImg.src=myPlane.boomSrc;
				$('.pasue_title').html('游戏结束');
				$('.pasue_over').show();
				pauseGame();
				over=true;
			}
			for(var l=0;l<bnum;l++){//循环子弹
				bx=bullets[l].bulletImg.offsetLeft;
				by=bullets[l].bulletImg.offsetTop;
				if(ex+enemies[k].planeSizeX>bx&&ex<bx+bullets[l].bW&&ey+enemies[k].planeSizeY>by&&ey<by+bullets[l].bH){//判断敌机与子弹碰撞
						enemies[k].planeHp-=bullets[l].bHurt;//敌机生命值减去子弹伤害
						gamespace.removeChild(bullets[l].bulletImg);
						bullets.splice(l,1);
						bnum--;
						if(enemies[k].planeHp<=0){//如果敌机生命值<0
							score+=enemies[k].planeScore;//加分
							if((score>=50000&&score<54000)||(score>=100000&&score<104000)||(score>=200000&&score<204000)||(score>=300000&&score<304000)||(score>=600000&&score<604000)||(score>=1000000&&score<1004000)){
								checkScore(score);
							}
							$('#score').html(score);
							$('#over_score').html(score);
							enemies[k].isLive=false;//敌机状态发生改变
						}
				}
			}
		}
		if(strength>0){
			strength--;
			if(strength<=0){
				clearInterval(bulletTime);
				bulletTime=setInterval(makeBullet1,80);
			}
		}
	}
	function enemiesBoom(){//敌机爆炸
		if(boom<=0){
			return false;
		}
		for(var z=0;z<ennum;z++){
			score+=enemies[z].planeScore;
			$('#score').html(score);
			$('#over_score').html(score);
			enemies[z].isLive=false;
		}
		boom--;
		$('#boom').html(boom);
		checkScore(score);
	}
//Bullet(hurt,positionX,positionY,sizeX,sizeY,bulletSpeed,imgSrc)
	function makeBullet1(){//创建子弹
		var bpX=parseInt(myPlane.planeImg.style.left)+myPlane.planeSizeX/2;
		var bpY=parseInt(myPlane.planeImg.style.top);
		var b=new Bullet(1,bpX,bpY,5,18,5,'http://a3.qpic.cn/psb?/V149fNWB1zLBHb/o210nfZFKKVSQ9fdR2CV0fhXLuLrLX8OdymEdjYy8sQ!/b/dGoBAAAAAAAA&bo=BQASAAAAAAADADI!&rf=viewer_4');
		bullets.push(b);
		bnum++;
	}
	function makeBullet2(){//创建子弹2
		var bpX=parseInt(myPlane.planeImg.style.left)+myPlane.planeSizeX/2;
		var bpY=parseInt(myPlane.planeImg.style.top);
		var b2=new Bullet(2,bpX-15,bpY+40,6,33,8,'http://a2.qpic.cn/psb?/V149fNWB1zLBHb/aFsOtFg3*A*Vya6L5MC7nzqoEqgKYa6cJpPoQuCwp90!/b/dD8BAAAAAAAA&bo=BgAhAAAAAAADAAI!&rf=viewer_4');
		var b3=new Bullet(2,bpX+15,bpY+40,6,33,8,'http://a2.qpic.cn/psb?/V149fNWB1zLBHb/aFsOtFg3*A*Vya6L5MC7nzqoEqgKYa6cJpPoQuCwp90!/b/dD8BAAAAAAAA&bo=BgAhAAAAAAADAAI!&rf=viewer_4');
		bullets.push(b2);
		bullets.push(b3);
		bnum+=2;
	}
	//function Package(type,positionX,positionY,sizeX,sizeY,speed,imgsrc)
	function makePack(){
		var typeNum=Math.floor(Math.random()*3)+1;
		var mx=Math.random()*964;
		pack=new Package(typeNum,mx,-36,36,36,10,'img/p'+typeNum+'.png');
		pFlyTime=setInterval(packFly,30);
	}
	function packFly(){
		var pkX=parseInt(pack.packImg.style.left);
		var pkY=parseInt(pack.packImg.style.top);
		if(pkX+pack.pgW>myPlanePositionX&&pkX<myPlanePositionX+myPlane.planeSizeX&&pkY+pack.pgH>myPlanePositionY&&pkY<myPlanePositionY+myPlane.planeSizeY){
				if(pack.pType==1){
					strength+=300;
					clearInterval(bulletTime);
					bulletTime=setInterval(makeBullet2,80);
				}
				else if(pack.pType==2){
					boom+=2;
					$('#boom').html(boom);
				}
				else if(pack.pType==3){
					score+=10000;
					checkScore(score);
					$('#score').html(score);
				}
				gamespace.removeChild(pack.packImg);
				pack=undefined;
				clearInterval(pFlyTime);
				return;
		}
		if(pack.pgY>=590){
			gamespace.removeChild(pack.packImg);
			pack=undefined;
			clearInterval(pFlyTime);
		}
		else{
			pack.flyPackage();
		}
	}
	function pauseGame(){
		if(over){
			return false;
		}
		if(pasue){
			$(document).unbind();
			bindPasue();
			$('#playgame').unbind();
			clearAllInterval();
			$('.black').show();
		}
		else{
			start_game();
			$('.black').hide();
		}
	}
	function bindPasue(){
		$(document).bind('keydown',function(e){
			var e=e||window.event;
			if(e.keyCode==32){
				pauseGame();
				pasue=!pasue;
			}
		});
		$(window).blur(function(){
			if(pasue){
				pauseGame();
			}
		});
	}
	function start_game(){
		$(document).bind('keydown',function(e){
			var e=e||window.event;
			if(e.keyCode==66&&pasue){
				enemiesBoom();
			}
		});
		$('#playgame').bind('mousemove',function(e){
			var e=e||event;
			myPlanePositionX=e.clientX-this.offsetLeft-(myPlane.planeSizeX/2);
			myPlanePositionY=e.clientY-this.offsetTop-(myPlane.planeSizeY/2);
			myPlane.planeImg.style.left=myPlanePositionX+'px';
			myPlane.planeImg.style.top=myPlanePositionY+'px';
		});
		myPlane.planeImg.onmousemove=function(){
			return false;
		}
		setAllInterval();
	}
	function clearAllInterval(){
		clearInterval(em1Time);
		clearInterval(em2Time);
		clearInterval(em3Time);
		clearInterval(emFlyTime);
		clearInterval(bFlyTime);
		clearInterval(bulletTime);
		clearInterval(packTime);
		clearInterval(pFlyTime);
	}
	function setAllInterval(){
		em1Time=setInterval(makeEn1,xsTimer);
		em2Time=setInterval(makeEn2,mdTimer);
		em3Time=setInterval(makeEn3,lgTimer);
		emFlyTime=setInterval(enemiesFly,30);
		bFlyTime=setInterval(bulletsFly,30);
		if(strength>0){
			bulletTime=setInterval(makeBullet2,buTimer);
		}
		else{
			bulletTime=setInterval(makeBullet1,buTimer);
		}
		packTime=setInterval(makePack,10000);
		if(pack){
			pFlyTime=setInterval(packFly,30);
		}
	}
	$('.start_btn').click(function(){
		$('#welcome').hide();
		$('#playgame').show();
		start_game();
		bindPasue();
	});
	function checkScore(score){
		if(score>=50000&&score<100000){
			xsSpeed=6;
		}
		else if(score>=100000&&score<200000){
			mdSpeed=6;
			xsTimer=800;
			mdTimer=1800;
			clearAllInterval();
			setAllInterval();
		}
		else if(score>=200000&&score<300000){
			xsSpeed=7;
			lgSpeed=6;
			lgTimer=2700;
			buTimer=90;
			clearAllInterval();
			setAllInterval();
		}
		else if(score>=300000&&score<600000){
			xsSpeed=8;
			mdSpeed=7;
			xsTimer=600;
			mdTimer=1600;
			lgTimer=2400;
			buTimer=100;
			clearAllInterval();
			setAllInterval();
		}
		else if(score>=600000&&score<1000000){
			xsSpeed=9;
			mdSpeed=8;
			lgSpeed=7;
			xsTimer=400;
			mdTimer=1200;
			lgTimer=1800;
			buTimer=120;
			clearAllInterval();
			setAllInterval();
		}
		else if(score>=1000000){
			xsSpeed=10;
			mdSpeed=9;
			lgSpeed=8;
			xsTimer=300;
			mdTimer=900;
			lgTimer=1500;
			buTimer=150;
			clearAllInterval();
			setAllInterval();
		}
	}
	$('#f5').click(function(){
		location.reload();
	});
});