var Paddle = function(obj){
	this.x=obj.x||0;
	this.y=obj.y||0;
	this.h=70;
	this.w=5;
}	
Paddle.prototype.setx=function(newx){
	this.x=newx;
}
Paddle.prototype.sety=function(newy){
	if(newy>=0&&newy<=300-this.h)this.y=newy;
}
Paddle.prototype.coord=function(){
	return {x:this.x,y:this.y,h:this.h,w:this.w};
}
var Ball = function(obj){
	this.origx=obj.x||0;
	this.origy=obj.y||0;
	this.x=obj.x||0;
	this.y=obj.y||0;
	this.h=10;
	this.w=10;
	this.dirx=-1;
	this.diry=-1;
	this.vx=5;
	this.vy=5;
}
Ball.prototype.move=function(){
	this.x+=this.vx*this.dirx;
	this.y+=this.vy*this.diry;
}
Ball.prototype.invertx=function(){
	this.dirx*=-1;
}
Ball.prototype.reset=function(){
	this.x=this.origx;
	this.y=this.origy;
	this.invertx();
}
Ball.prototype.inverty=function(){
	this.diry*=-1;
}
Ball.prototype.coord=function(){
	return {x:this.x,y:this.y,h:this.h,w:this.w};
}

