var turn = 0;
var cnv;
var board;
var alerty = true;
var success = false;
var tut;
var tutSetup;
var scoreBlack = 0;

function setup() {
	cnv = createCanvas(720, 720);
	cnv.parent('canvas');
	board = new Board(640, 9, 40);
	tut = new Tutorial(board);
	var title = (document.getElementById("pageTitle")).innerHTML;
	if (title == "Tutorial One"){
		tutSetup = tut.tutorial1Setup();
	} else {
		tutSetup = tut.tutorial2Setup();
	}

	board.grid = tutSetup[1];
	}

function calcPos(n){
  return Math.round((n * board.spacing) + board.padding);
}

function draw() {
	background(0);
	fill(205,175,149);
	stroke(139,119,101);
	strokeWeight(2);
	// initialises the empty board with size blocks * blocks.
	for (x=0; x<board.blocks; x++){
		for (y=0; y<board.blocks; y++) {
			rect(x* board.spacing + board.padding, y * board.spacing + board.padding, board.spacing, board.spacing);
		}
	}

	board.display();

  if (alerty){
    alert(tutSetup[0]);
    alerty = false;
  }
  if (success){
    alert("Great Job!");
		location.href = "tutorialhome.html";
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

function mouseClicked(){

  var position = closestIntersection();
	var stoneX = position[0];
	var stoneY = position[1];

	// adds the stone if the chosen intersection isnt occupied.
  if (turn < 1){
  	board.addAndCheck(stoneX,stoneY);
		if (board.grid[0][1] != 0 || board.grid[5][2]){
			success = true;
		}
  } else {
    alert("Try Again");
    location.reload();
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
