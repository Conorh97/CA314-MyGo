var boardSize = 640;
var blocks = 9;
var spacing = boardSize/blocks;
var turn = 0;
var padding = 40;
var grid = [];
var placedStones = [];
var stoneIndex = 0;
var cnv;

function setup() {
	cnv = createCanvas(720, 720);
	makeGrid();
	cnv.parent('canvas');
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
	for (i=0;i<grid.length;i++){
		for (j=0;j<grid[i].length;j++){
			if (grid[i][j] != 0){
				grid[i][j].display();
			}
		}
		//placedStones[i].display();
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

function isArrayInArray(source, search) {
	// Checks if 2 element array is in 2D array
    for (var i = 0, len = source.length; i < len; i++) {
        if (source[i][0] === search[0] && source[i][1] === search[1]) {
            return true;
        }
    }
    return false;
}

function libertyBFS(seen, x, y, colour) {
	// Function to check if stone should be taken
	curr_stone = grid[y][x];

	if (curr_stone == 0) {
		return 1;
	} else if (curr_stone.colour == colour) {
		return 0;
	} else {

		newSeen = [];
		notSeenLiberties = [];

		for (i = 0; i < seen.length; i++) {
			newSeen.push(seen[i]);
		}

		for (i = 0; i < curr_stone.liberties.length; i++) {
			if (isArrayInArray(seen, curr_stone.liberties[i]) == false) {
				newSeen.push(curr_stone.liberties[i]);
				notSeenLiberties.push(curr_stone.liberties[i]);
			}
		}

		if (notSeenLiberties.length == 0) {
			return 0;
		}

		result = 0;

		for (i = 0; i < notSeenLiberties.length; i++) {
			lib = notSeenLiberties[i];
			console.log(lib[1],lib[0]);
			result += (libertyBFS(newSeen, lib[0], lib[1], colour));
		}

		return result;
	}
}

function mouseClicked(){

    var position = closestIntersection();
	var x = position[0];
	var y = position[1];

	// adds the stone if the chosen intersection isnt occupied.
	if (emptyIntersection(x,y)){
		newStone = new Stone(x,y,turn);
		placedStones[stoneIndex] = newStone;
		grid[newStone.getGridY()][newStone.getGridX()] = newStone;
		// For each new stone, we check its liberties for a stone of opposite colour.
		// If one exists, we check if if should be taken
		for (i = 0; i < newStone.liberties.length; i++) {
			curr_lib = newStone.liberties[i];
			grid_spot = grid[curr_lib[1]][curr_lib[0]]; // The value at the current liberties coordinates
			if (grid_spot != 0) {
				if (grid_spot.colour != newStone.colour) {
					if (libertyBFS([[curr_lib[0], curr_lib[1]]], curr_lib[0], curr_lib[1], newStone.colour) == 0) {
						console.log("take");
						grid[curr_lib[1]][curr_lib[0]] = 0;
					}
				}
			}
		}
		stoneIndex += 1;
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

// function to check if the intersection is unoccupied by a stone.
function emptyIntersection(x,y){
	for (i=0;i<placedStones.length;i++){
		if (placedStones[i].x == x && placedStones[i].y == y){
			return false;
		}
	}
	return true;
}
