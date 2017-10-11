var stones = []
class Stone{
  constructor(x,y,turn){
    this.x = x;
    this.y = y;
    if(turn % 2 == 0){
  		this.colour = 1;
  	}else{
  		this.colour = 0;
  	}
    this.getLiberties();
  }
  display(){
    if(this.colour == 1){
			fill(0);
		} else{
			fill(255);
		}
		ellipse(this.x, this.y, spacing/2, spacing/2);
  }
  getGridX(){
    return Math.round((this.x - padding) / spacing);
  }
  getGridY(){
    return Math.round((this.y - padding) / spacing);
  }
  getBoardEnd(){
    return padding + boardSize;
  }
  getLiberties(){

  	if (this.x == this.getBoardEnd() && this.y == this.getBoardEnd()) {
  		this.liberties = [[this.x - spacing, this.y], [this.x , this.y - spacing]];
  	} else if (this.x == this.getBoardEnd() && this.y == padding) {
  		this.liberties = [[this.x - spacing, this.y], [this.x , this.y + spacing]];
  	} else if (this.x == padding && this.y == this.getBoardEnd()) {
  		this.liberties = [[this.x + spacing, this.y], [this.x , this.y - spacing]];
  	} else if (this.x == padding && this.y == padding) {
  		this.liberties = [[this.x + spacing, this.y], [this.x , this.y + spacing]];
  	} else if (this.x == this.getBoardEnd()) {
  		this.liberties = [[this.x - spacing, this.y], [this.x , this.y - spacing], [this.x , this.y + spacing]];
  	} else if (this.y == this.getBoardEnd()) {
  		this.liberties = [[this.x - spacing, this.y], [this.x + spacing, this.y], [this.x , this.y - spacing]];
  	} else if (this.x == padding) {
  		this.liberties = [[this.x + spacing, this.y], [this.x , this.y - spacing], [this.x , this.y + spacing]];
  	} else if (this.y == padding) {
  		this.liberties = [[this.x - spacing, this.y], [this.x + spacing, this.y], [this.x , this.y + spacing]];
  	} else {
  		this.liberties = [[this.x + spacing, this.y], [this.x - spacing, this.y], [this.x , this.y + spacing], [this.x , this.y - spacing]];
  	}

  	for (i = 0; i < this.liberties.length; i++) {
  		this.liberties[i][0] = Math.round((this.liberties[i][0] - padding) / spacing);
  		this.liberties[i][1] = Math.round((this.liberties[i][1] - padding) / spacing);
  	}

  }
}
