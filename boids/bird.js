var Bird=function(obj){
	this.x=obj.x||50;
	this.y=obj.y||50;
	
	var v=Math.random()*5+5;
	this.a=0.4;

	this.dy=v*Math.sin(this.a);
	this.dx=v*Math.cos(this.a);
}
Bird.prototype={
	update:function(){
		//Using this.dy and this.dx, update this.a and x and y	
		this.x+=this.dx;
		this.y+=this.dy;
		this.a =Math.atan(this.dy/this.dx);
	}
}
