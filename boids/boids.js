$(document).ready(function(){
	//Screen properties
	var screenheight=600, screenwidth=800;

	var Birds=[];	
	var data=[];
	var background,bir;
	function init(){
		Birds.push(new Bird({x:50,y:50}));
		Birds.push(new Bird({x:100,y:80}));
		Birds.push(new Bird({x:150,y:50}));
		Birds.push(new Bird({x:200,y:50}));
		Birds.push(new Bird({x:250,y:50}));
		Birds.push(new Bird({x:300,y:50}));
		Birds.push(new Bird({x:350,y:50}));
		

		background = d3.select("body").append("svg")
			.attr("height",screenheight)
			.attr("width",screenwidth)
			.attr("class",'bg');

		//DRAW BIRDS		
		bir=background.selectAll("bird").data(Birds).enter()
			.append("svg:ellipse")
			.attr("rx",20)
			.attr("ry",10)
			.attr("transform",function(d){return "rotate("+(d.a*180/Math.PI+90)+","+d.x+","+d.y+")";})
			.attr("cx",function(d){return d.x;})
			.attr("cy",function(d){return d.y;})
			.attr("class","birds");
	}

	function update(){
		var numBirds=Birds.length;
		if(!numBirds)return;

		//WEIGHTS TO INFLUENCE BEHAVIOUR
		var w1=0.1,w2=0.1,w3=0.1;

		//FIRST OF ALL, CALCULATE ALL THE DELTAS FOR EACH BIRD
		//A) find average		
		var totalx=0,totaly=0,totalv=0;
		for(var q=0;q<Birds.length;q++){
			totalx+=Birds[q].x;
			totaly+=Birds[q].y;
			totalv+=Birds[q].v;	
		}	

		for(var q=0;q<numBirds;q++){
			var aimx = (totalx-Birds[q].x)/(numBirds-1);
			var aimy = (totaly-Birds[q].y)/(numBirds-1);

			//calculate direction towards aim
			var distance = Math.sqrt(Math.pow(aimy-Birds[q].y,2)+Math.pow(aimx-Birds[q].x,2));
			var angle = Math.atan2((aimy-Birds[q].y),(aimx-Birds[q].x));
			
			//cap magnitude
			distance=Math.min(distance,0.01);
		
			var dy=distance*Math.sin(angle);
			var dx=distance*Math.cos(angle);

			//console.log("dy: "+dy+" dx: "+dx);
			
			Birds[q].dy+=dy;
			Birds[q].dx+=dx;
			
			//RULE 2: CHECK FOR ANY BIRDS THAT ARE WITHIN A RADIUS OF 50 AND AVOID THEM

			for(var w=0;w<numBirds;w++){
				if(q==w)continue;
				if(Math.sqrt(Math.pow(Birds[w].y-Birds[q].y,2)+Math.pow(Birds[w].x-Birds[q].x,2))<40){
					//CALCULATE A VECTOR IN THE OPPOSITE DIRECTION OF 
					var distance = Math.sqrt(Math.pow(Birds[w].y-Birds[q].y,2)+Math.pow(Birds[w].x-Birds[q].x,2));
					var angle = Math.atan2((Birds[w].y-Birds[q].y),(Birds[w].x-Birds[q].y));
					angle+=Math.PI;
					distance=Math.min(distance,0.1);
					var dy=distance*Math.sin(angle);
					var dx=distance*Math.cos(angle);
					
					Birds[q].dy+=dy;
					Birds[q].dx+=dx;

					//console.log("DISTANCE BETWEEN BIRD "+q+" AND BIRD "+w+" IS "+distance+" ang: "+angle);
					//console.log("BIRD "+q+" has a change of dy: "+dy+" dx: "+dx);
				}
			}

			//RULE 3: MAKE SPEED SAME
			var currentspeed=Math.sqrt(Math.pow(Birds[q].dy,2)+Math.pow(Birds[q].dx,2));
			var avgspeed = (totalv-currentspeed)/(numBirds-1);
			if(avgspeed>currentspeed){
				//SPEED UP YOU FOOL
				Birds[q].dy*=1.1;
				Birds[q].dx*=1.1;
			}else if(currentspeed>avgspeed){
				//SLOW DOWN YOU FOOL
				
				Birds[q].dy*=0.9;
				Birds[q].dx*=0.9;
			}
		}

		


		for(var q=0;q<numBirds;q++){
			Birds[q].update();
		}
		bir = bir.data(Birds)
			.attr("transform",function(d){return "rotate("+(d.a*180/Math.PI+90)+","+d.x+","+d.y+")";})
			.attr("cx",function(d){return d.x;})
			.attr("cy",function(d){return d.y;});
		bir.exit().remove();

		//return true;
	}
	d3.timer(update,1000,1000);
	init();



});
