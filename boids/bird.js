var Bird=function(obj){
	this.x=obj.x||50;
	this.y=obj.y||50;
	
	this.v=Math.random()*2+2;
	this.a=0.4;

	this.dy=this.v*Math.sin(this.a);
	this.dx=this.v*Math.cos(this.a);
}
Bird.prototype={
	update:function(){
		//Using this.dy and this.dx, update this.a and x and y	
		this.dx=Math.max(this.dx,0.3);
		this.dy=Math.max(this.dy,0.3);	

		this.x+=this.dx;
		this.y+=this.dy;
		this.a =Math.atan(this.dy/this.dx);

		this.v=Math.sqrt(Math.pow(this.dx,2)+Math.pow(this.dy,2));
	}
}
