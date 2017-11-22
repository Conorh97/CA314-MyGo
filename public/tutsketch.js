var turn = 0;
var cnv;
var board;
var alerty = true;
var success = false;

function setup() {
	cnv = createCanvas(720, 720);
	cnv.parent('canvas');
	board = new Board(640, 9, 40);
  console.log(board.grid);
  board.grid = [[new Stone(calcPos(0),calcPos(0),1),0,0,0,0,0,0,0,0,0],
                [new Stone(calcPos(1),calcPos(0),2),0,0,0,0,0,0,0,0,0],
                [0,0,0,0,0,0,0,0,0,0],
                [0,0,0,0,0,0,0,0,0,0],
                [0,0,0,0,0,0,0,0,0,0],
                [0,0,0,0,0,0,0,0,0,0],
                [0,0,0,0,0,0,0,0,0,0],
                [0,0,0,0,0,0,0,0,0,0],
                [0,0,0,0,0,0,0,0,0,0],
                [0,0,0,0,0,0,0,0,0,0],]
  console.log(board.grid);
}

function calcPos(n){
  return Math.round((n * board.spacing) + board.padding);
}

function makeGrid() {
	for (i = 0; i < board.blocks + 1; i++) {
		curr_row = [];
		for (j = 0; j < board.blocks + 1; j++) {
			curr_row.push(0);
		}
		board.grid.push(curr_row);
	}
}

function draw() {
	background(0);
	fill(205,175,149);
	stroke(139,119,101);
	// initialises the empty board with size blocks * blocks.
	for(x=0; x<board.blocks; x++){
		for (y=0; y<board.blocks; y++) {
			rect(x*board.spacing+board.padding,y*board.spacing+board.padding,board.spacing,board.spacing);
		}
	}
	for (i=0;i<board.grid.length;i++){
		for (j=0;j<board.grid[i].length;j++){
			if (board.grid[i][j] != 0){
				board.grid[i][j].display();
			}
		}
		//placedStones[i].display();
	}
  if (alerty){
    alert("A black stone at (0,1) will take the white stone. Try it now!");
    alerty = false;
  }
  if (success){
    alert("Great Job You Mug!");
    success = false;
  }

	// green pointer if empty, red pointer if occupied
	var position = closestIntersection();
	var x = position[0];
	var y = position[1];
	if (x <= 690 && x >= 0 && y <= 690 && y >= 0) {
		if (!(board.emptyIntersection(x,y))){
			fill(204,0,0);
		} else{
			fill(102,204,0);
		}
		ellipse(x,y,board.spacing/4, board.spacing/4);
	}
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
	curr_stone = board.grid[x][y];

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
			console.log(lib[0],lib[1]);
			result += (libertyBFS(newSeen, lib[0], lib[1], colour));
		}

		return result;
	}
}

function mouseClicked(){

  var position = closestIntersection();
	var stoneX = position[0];
	var stoneY = position[1];

	console.log("sending: " + stoneX + "," + stoneY);

	var data = {
		x: stoneX,
		y: stoneY
	}

	// adds the stone if the chosen intersection isnt occupied.
  if (turn < 1){
  	if (board.emptyIntersection(stoneX, stoneY)){
  		newStone = new Stone(stoneX,stoneY,turn);
  		board.addStone(newStone);
  		// For each new stone, we check its liberties for a stone of opposite colour.
  		// If one exists, we check if if should be taken
  		for (i = 0; i < newStone.liberties.length; i++) {
  			curr_lib = newStone.liberties[i];
  			grid_spot = board.grid[curr_lib[0]][curr_lib[1]]; // The value at the current liberties coordinates
  			if (grid_spot != 0) {
  				if (grid_spot.colour != newStone.colour) {
  					if (libertyBFS([[curr_lib[0], curr_lib[1]]], curr_lib[0], curr_lib[1], newStone.colour) == 0) {
  						console.log("take");
  						board.grid[curr_lib[0]][curr_lib[1]] = 0;
              success = true;
  					}
  				}
  			}
  		}
  		turn += 1;
  	}
  } else {
    alert("Try Again");
    location.reload();
  }

}

function newMouseClicked(data){
	var stoneX = data.x;
	var stoneY = data.y;

	console.log("received: " + stoneX + "," + stoneY);

	// adds the stone if the chosen intersection isnt occupied.
	if (board.emptyIntersection(stoneX, stoneY)){
		newStone = new Stone(stoneX,stoneY,turn);
		board.addStone(newStone);
		// For each new stone, we check its liberties for a stone of opposite colour.
		// If one exists, we check if if should be taken
		for (i = 0; i < newStone.liberties.length; i++) {
			curr_lib = newStone.liberties[i];
			grid_spot = board.grid[curr_lib[0]][curr_lib[1]]; // The value at the current liberties coordinates
			if (grid_spot != 0) {
				if (grid_spot.colour != newStone.colour) {
					if (libertyBFS([[curr_lib[0], curr_lib[1]]], curr_lib[0], curr_lib[1], newStone.colour) == 0) {
						console.log("take");
						board.grid[curr_lib[0]][curr_lib[1]] = 0;
					}
				}
			}
		}
		turn += 1;
	}

}

function closestIntersection(){
	// gets location for nearest intersection to the mouse.
	var x;
	var y;
	var modX = mouseX % board.spacing;
	var modY = mouseY % board.spacing;
	if(modX>=(board.spacing/2)+board.padding){
		x = (mouseX - modX) + board.spacing;
		x+=board.padding;
	} else{
		x = mouseX - modX;
		x+= board.padding;
	}
	if(modY>=(board.spacing/2)+board.padding){
		y = (mouseY - modY) + board.spacing;
		y += board.padding;
	} else{
		y = mouseY - modY;
		y+= board.padding;
	}
	return [x,y];
}
