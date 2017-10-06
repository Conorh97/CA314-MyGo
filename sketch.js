
var size = 640;
var blocks = 5;
var spacing = size/blocks;
var turn = 0;
var padding = 40;
var placedStones = [];
var stoneIndex = 0;

function setup() {
	createCanvas(720, 720);
}

function draw() {
	background(0);
	fill(205,175,149);
	stroke(139,119,101);
	//console.log(spacing);
	for(x=0; x<blocks; x++){
		for (y=0; y<blocks; y++) {
			rect(x*spacing+padding,y*spacing+padding,spacing,spacing);
		}
	}
	noLoop();
}

function mouseClicked(){
	if(turn%2==0){
		fill(0);
	} else{
		fill(255);
	}

	var x;
	var y;
	var modX = mouseX % spacing;
	var modY = mouseY % spacing;
	if(modX>=(spacing/2)+padding){
		x = (mouseX - modX) + spacing;
		x+=padding;
	} else{
		x = mouseX - modX;
		x+= padding;
	}
	if(modY>=(spacing/2)+padding){
		y = (mouseY - modY) + spacing;
		y += padding;
	} else{
		y = mouseY - modY;
		y+= padding;
	}
	if (emptyIntersection(x,y)){
		placedStones[stoneIndex] = new Stone(x,y);
		placedStones[stoneIndex].display();
		stoneIndex+=1;
		turn += 1;
	}

}

function Stone(x,y){
	this.x = x;
	this.y = y;
	this.display = function(){
		ellipse(this.x, this.y, spacing/2, spacing/2);
	}
}

function emptyIntersection(x,y){
	for (i=0;i<placedStones.length;i++){
		if (placedStones[i].x == x && placedStones[i].y == y){
			return false;
		}
	}
	return true;
}
