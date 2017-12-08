var turn = 0;
var cnv;
var board;
var socket;
var myTurn = true;
var scoreBlack = 0;
var scoreWhite = 0;
var skipCount = 0;

function setup() {
	cnv = createCanvas(720, 720);
	cnv.parent('canvas');
	board = new Board(640, 9, 40);
	socket = io.connect('http://localhost:3000');
	socket.on('stoneXY', newMouseClicked);
	socket.on('skip', opSkip);
	socket.on('end', opEndGame);
}

function draw() {
	background(0);
	fill(205,175,149);
	stroke(139,119,101);
	strokeWeight(2);
	// initialises the empty board with size blocks * blocks.
	for (x = 0; x < board.blocks; x++) {
		for (y=0; y < board.blocks; y++) {
			rect(x * board.spacing + board.padding, y * board.spacing + board.padding, board.spacing, board.spacing);
		}
	}

	board.display();
	document.getElementById("insertBlackScore").innerHTML = scoreBlack;
	document.getElementById("insertWhiteScore").innerHTML = scoreWhite;

	// green pointer if empty, red pointer if occupied
	var position = closestIntersection();
	var x = position[0];
	var y = position[1];
	if (x <= 690 && x >= 0 && y <= 690 && y >= 0) {
		if (!myTurn || !(board.emptyIntersection(x,y))) {
			fill(204,0,0);
		} else {
			fill(102,204,0);
		}
		ellipse(x, y, board.spacing/4, board.spacing/4);
	}
}

function mouseClicked(){
	if (myTurn) {
	  var position = closestIntersection();
		var stoneX = position[0];
		var stoneY = position[1];

		var data = {
			x: stoneX,
			y: stoneY,
			t: true
		}

		if(board.emptyIntersection(stoneX, stoneY)){
			console.log("sending: " + stoneX + "," + stoneY);
			myTurn = false;
			skipCount = 0;
			socket.emit('stoneXY', data);
		}

		board.addAndCheck(stoneX,stoneY);
		document.getElementById("insertBlackScore").innerHTML = scoreBlack;
		document.getElementById("insertWhiteScore").innerHTML = scoreWhite;

		if (scoreBlack >= 100 || scoreWhite >= 100) {
			endGame(1);
		}
	}
}

function newMouseClicked(data){
	var stoneX = data.x;
	var stoneY = data.y;
	myTurn = data.t;
	skipCount = 0;

	console.log("received: " + stoneX + "," + stoneY);

	board.addAndCheck(stoneX, stoneY);
	document.getElementById("insertBlackScore").innerHTML = scoreBlack;
	document.getElementById("insertWhiteScore").innerHTML = scoreWhite;

	if (scoreBlack >= 100 || scoreWhite >= 100) {
		endGame(1);
	}
}


function closestIntersection(){
	// gets location for nearest intersection to the mouse.
	var x;
	var y;
	var modX = mouseX % board.spacing;
	var modY = mouseY % board.spacing;
	if (modX >= (board.spacing / 2) + board.padding){
		x = (mouseX - modX) + board.spacing;
		x += board.padding;
	} else {
		x = mouseX - modX;
		x += board.padding;
	}
	if (modY >= (board.spacing / 2) + board.padding){
		y = (mouseY - modY) + board.spacing;
		y += board.padding;
	} else {
		y = mouseY - modY;
		y += board.padding;
	}
	return [x,y];
}

function skipTurn() {
	if (myTurn) {
		turn++;
		skipCount++;

		if (skipCount == 2) {
			endGame(2);
		}	else {
			myTurn = false;

			var data = {
				t: true
			}

			console.log("Turn Skipped");
			socket.emit('skip', data);
		}
	} else {
		alert("It isn't your turn.")
	}
}

function opSkip(data) {
	skipCount++;
	if (skipCount < 2) {
		console.log(skipCount);
		alert("Your opponent skipped their turn.")
		myTurn = data.t;
		turn++;
	}
}

function endGame(message) {
	var score = "Black   " + scoreBlack + " : " + scoreWhite + "   White"

	if (scoreBlack > scoreWhite) {
		var winner = "Black wins.";
	} else if (scoreBlack < scoreWhite) {
		var winner = "White wins.";
	} else {
		var winner = "Draw.";
	}

	if (message == 0) {
		alert("You have quit!");
		var msg = "Your opponent has quit!";
		socket.emit('end', msg);
	}	else if (message == 1) {
		alert("Score limit reached!" + "\n\n\t\t" + score + "\n\n\t\t\t" + winner);
	}	else if (message == 2) {
		var msg = "Game Over. Two consecutive skips were made." + "\n\n\t\t" + score + "\n\n\t\t\t" + winner
		alert(msg);
		socket.emit('end', msg);
	}

	console.log("endgame");

	location.href = "website/selectmode.html";
}

function opEndGame(msg) {
	alert(msg);
	location.href = "website/selectmode.html";
}
