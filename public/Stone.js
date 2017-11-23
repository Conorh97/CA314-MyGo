var stones = []
class Stone {
  constructor (x, y, turn) {
    this.x = x;
    this.y = y;
    if (turn % 2 == 0) {
  		this.colour = 1;
  	} else {
  		this.colour = 0;
  	}

    this.getLiberties();
  }

  display() {
    if (this.colour == 1) {
			fill(0);
		} else {
			fill(255);
		}
		ellipse(this.x, this.y, board.spacing / 2, board.spacing / 2);
  }

  getGridX() {
    return Math.round((this.x - board.padding) / board.spacing);
  }
  getGridY() {
    return Math.round((this.y - board.padding) / board.spacing);
  }
  getBoardEnd() {
    return board.padding + board.boardSize;
  }
  getLiberties() {
  	if (this.x == this.getBoardEnd() && this.y == this.getBoardEnd()) {
  		this.liberties = [[this.x - board.spacing, this.y], [this.x , this.y - board.spacing]];
  	} else if (this.x == this.getBoardEnd() && this.y == board.padding) {
  		this.liberties = [[this.x - board.spacing, this.y], [this.x , this.y + board.spacing]];
  	} else if (this.x == board.padding && this.y == this.getBoardEnd()) {
  		this.liberties = [[this.x + board.spacing, this.y], [this.x , this.y - board.spacing]];
  	} else if (this.x == board.padding && this.y == board.padding) {
  		this.liberties = [[this.x + board.spacing, this.y], [this.x , this.y + board.spacing]];
  	} else if (this.x == this.getBoardEnd()) {
  		this.liberties = [[this.x - board.spacing, this.y], [this.x , this.y - board.spacing], [this.x , this.y + board.spacing]];
  	} else if (this.y == this.getBoardEnd()) {
  		this.liberties = [[this.x - board.spacing, this.y], [this.x + board.spacing, this.y], [this.x , this.y - board.spacing]];
  	} else if (this.x == board.padding) {
  		this.liberties = [[this.x + board.spacing, this.y], [this.x , this.y - board.spacing], [this.x , this.y + board.spacing]];
  	} else if (this.y == board.padding) {
  		this.liberties = [[this.x - board.spacing, this.y], [this.x + board.spacing, this.y], [this.x , this.y + board.spacing]];
  	} else {
  		this.liberties = [[this.x + board.spacing, this.y], [this.x - board.spacing, this.y], [this.x , this.y + board.spacing], [this.x , this.y - board.spacing]];
  	}

  	for (var i = 0; i < this.liberties.length; i++) {
  		this.liberties[i][0] = Math.round((this.liberties[i][0] - board.padding) / board.spacing);
  		this.liberties[i][1] = Math.round((this.liberties[i][1] - board.padding) / board.spacing);
  	}

  }
}
