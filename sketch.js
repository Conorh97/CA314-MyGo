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
	// initialises the empty board with size blocks * blocks.
	for(x=0; x<blocks; x++){
		for (y=0; y<blocks; y++) {
			rect(x*spacing+padding,y*spacing+padding,spacing,spacing);
		}
	}
	for (i=0;i<placedStones.length;i++){
		placedStones[i].display();
	}
	fill(102,204,0);
	var position = closestIntersection();
	var x = position[0];
	var y = position[1];
	ellipse(x,y,spacing/4, spacing/4);
}

function mouseClicked(){

  var position = closestIntersection();
	var x = position[0];
	var y = position[1];
	console.log(x);
	console.log(y);

	// adds and displays the stone if the chosen intersection isnt occupied.
	if (emptyIntersection(x,y)){
		placedStones[stoneIndex] = new Stone(x,y);
		stoneIndex+=1;
		turn += 1;
	}

}

function closestIntersection(){
	// gets location for nearest intersection to the mouse click.
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
	return [x,y];
}

function Point(x,y) {
	this.x = x;
	this.y = y;
}

function getLiberties(s) {
	if (x + 1 > blocks && y + 1 > blocks) {
		s.liberties = [Point(x - 1, y), Point(x, y - 1)];
	} else if (x + 1 > blocks && y - 1 < 0) {
		s.liberties = [Point(x - 1, y), Point(x, y + 1)];
	} else if (x - 1 < 0 && y + 1 > blocks) {
		s.liberties = [Point(x + 1, y), Point(x, y - 1)];
	} else if (x - 1 < 0 && y - 1 < 0) {
		s.liberties = [Point(x + 1, y), Point(x, y + 1)];
	} else if (x + 1 > blocks) {
		s.liberties = [Point(x - 1, y), Point(x, y - 1), Point(x, y + 1)];
	} else if (y + 1 > blocks) {
		s.liberties = [Point(x - 1, y), Point(x + 1, y), Point(x, y - 1)];
	} else if (x - 1 > blocks) {
		s.liberties = [Point(x + 1, y), Point(x, y - 1), Point(x, y + 1)];
	} else if (y - 1 > blocks) {
		s.liberties = [Point(x - 1, y), Point(x + 1, y), Point(x, y + 1)];
	} else {
		s.liberties = [Point(x + 1, y), Point(x - 1, y), Point(x, y + 1), Point(x, y - 1)];
	}
}

function Stone(x,y) {
	this.x = x;
	this.y = y;
	if(turn % 2 == 0){
		this.colour = 1;
	}else{
		this.colour = 0;
	}
	this.display = function(){
		// changes between black/white stones.
		if(this.colour == 1){
			fill(0);
		} else{
			fill(255);
		}
		ellipse(this.x, this.y, spacing/2, spacing/2);
	}
	getLiberties(this);
}

// function to check if the intersection is unoccupied by a stone.
function emptyIntersection(x,y){
	for (i=0;i<placedStones.length;i++){
		if (placedStones[i].x == x && placedStones[i].y == y){
			return false;
		}
	}
	return true;
}
