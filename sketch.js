var boardSize = 640;
var blocks = 9;
var spacing = boardSize/blocks;
var turn = 0;
var padding = 40;
var grid = [];
var placedStones = [];
var stoneIndex = 0;

function setup() {
	createCanvas(720, 720);
	makeGrid();
}

function makeGrid() {
	for (i = 0; i < blocks + 1; i++) {
		curr_row = [];
		for (j = 0; j < blocks + 1; j++) {
			curr_row.push(0);
		}
		grid.push(curr_row);
	}
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

	// green pointer if empty, red pointer if occupied
	var position = closestIntersection();
	var x = position[0];
	var y = position[1];
	if (!(emptyIntersection(x,y))){
		fill(204,0,0);
	} else{
		fill(102,204,0);
	}
	ellipse(x,y,spacing/4, spacing/4);
}

function mouseClicked(){

  var position = closestIntersection();
	var x = position[0];
	var y = position[1];

	// adds the stone if the chosen intersection isnt occupied.
	if (emptyIntersection(x,y)){
		newStone = new Stone(x,y);
		placedStones[stoneIndex] = newStone;
		grid[newStone.getGridY()][newStone.getGridX()] = newStone;
		stoneIndex+=1;
		turn += 1;
	}

}

function closestIntersection(){
	// gets location for nearest intersection to the mouse.
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

function getBoardEnd() {
	return padding + boardSize;
}

function getLiberties(x, y) {
	liberties = [];

	if (x == getBoardEnd() && y == getBoardEnd()) {
		liberties = [[x - spacing, y], [x, y - spacing]];
	} else if (x == getBoardEnd() && y == padding) {
		liberties = [[x - spacing, y], [x, y + spacing]];
	} else if (x == padding && y == getBoardEnd()) {
		liberties = [[x + spacing, y], [x, y - spacing]];
	} else if (x == padding && y == padding) {
		liberties = [[x + spacing, y], [x, y + spacing]];
	} else if (x == getBoardEnd()) {
		liberties = [[x - spacing, y], [x, y - spacing], [x, y + spacing]];
	} else if (y == getBoardEnd()) {
		liberties = [[x - spacing, y], [x + spacing, y], [x, y - spacing]];
	} else if (x == padding) {
		liberties = [[x + spacing, y], [x, y - spacing], [x, y + spacing]];
	} else if (y == padding) {
		liberties = [[x - spacing, y], [x + spacing, y], [x, y + spacing]];
	} else {
		liberties = [[x + spacing, y], [x - spacing, y], [x, y + spacing], [x, y - spacing]];
	}

	for (i = 0; i < liberties.length; i++) {
		liberties[i][0] = Math.round((liberties[i][0] - padding) / spacing);
		liberties[i][1] = Math.round((liberties[i][1] - padding) / spacing);
	}

	return liberties;
}

function Stone(x,y) {
	this.x = x;
	this.y = y;
	// chooses the colour based on how many turns have occured.
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

	this.getGridX = function() {
		return Math.round((this.x - padding) / spacing);
	}

	this.getGridY = function() {
		return Math.round((this.y - padding) / spacing);
	}

	this.liberties = getLiberties(this.x, this.y);
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
