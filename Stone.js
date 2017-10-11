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
    this.liberties = this.getLiberties();
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

    this.gridX = this.getGridX();
    this.gridY = this.getGridY();

  	if (this.gridX== this.getBoardEnd() && this.gridY == this.getBoardEnd()) {
  		this.liberties = [[this.gridX- spacing, this.gridY], [this.gridX, this.gridY - spacing]];
  	} else if (this.gridX== this.getBoardEnd() && this.gridY == padding) {
  		this.liberties = [[this.gridX- spacing, this.gridY], [this.gridX, this.gridY + spacing]];
  	} else if (this.gridX== padding && this.gridY == this.getBoardEnd()) {
  		this.liberties = [[this.gridX+ spacing, this.gridY], [this.gridX, this.gridY - spacing]];
  	} else if (this.gridX== padding && this.gridY == padding) {
  		this.liberties = [[this.gridX+ spacing, this.gridY], [this.gridX, this.gridY + spacing]];
  	} else if (this.gridX== this.getBoardEnd()) {
  		this.liberties = [[this.gridX- spacing, this.gridY], [this.gridX, this.gridY - spacing], [this.gridX, this.gridY + spacing]];
  	} else if (this.gridY == this.getBoardEnd()) {
  		this.liberties = [[this.gridX- spacing, this.gridY], [this.gridX+ spacing, this.gridY], [this.gridX, this.gridY - spacing]];
  	} else if (this.gridX== padding) {
  		this.liberties = [[this.gridX+ spacing, this.gridY], [this.gridX, this.gridY - spacing], [this.gridX, this.gridY + spacing]];
  	} else if (this.gridY == padding) {
  		this.liberties = [[this.gridX- spacing, this.gridY], [this.gridX+ spacing, this.gridY], [this.gridX, this.gridY + spacing]];
  	} else {
  		this.liberties = [[this.gridX+ spacing, this.gridY], [this.gridX- spacing, this.gridY], [this.gridX, this.gridY + spacing], [this.gridX, this.gridY - spacing]];
  	}

  	for (i = 0; i < this.liberties.length; i++) {
  		this.liberties[i][0] = Math.round((this.liberties[i][0] - padding) / spacing);
  		this.liberties[i][1] = Math.round((this.liberties[i][1] - padding) / spacing);
  	}

  }
}
