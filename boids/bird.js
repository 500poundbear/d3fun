var Bird=function(obj){
	this.x=obj.x||50;
	this.y=obj.y||50;
	
	this.dy=0;
	this.dx=0;

	this.v=Math.random()*5+5;
	this.a=0;
}
Bird.prototype={
	update:function(){
		//Assumi	

	}
}
