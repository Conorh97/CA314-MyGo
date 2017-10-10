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

  	if (this.grid == this.getBoardEnd() && this.gridY == this.getBoardEnd()) {
  		this.liberties = [[this.grid - spacing, this.gridY], [this.grid, this.gridY - spacing]];
  	} else if (this.grid == this.getBoardEnd() && this.gridY == padding) {
  		this.liberties = [[this.grid - spacing, this.gridY], [this.grid, this.gridY + spacing]];
  	} else if (this.grid == padding && this.gridY == this.getBoardEnd()) {
  		this.liberties = [[this.grid + spacing, this.gridY], [this.grid, this.gridY - spacing]];
  	} else if (this.grid == padding && this.gridY == padding) {
  		this.liberties = [[this.grid + spacing, this.gridY], [this.grid, this.gridY + spacing]];
  	} else if (this.grid == this.getBoardEnd()) {
  		this.liberties = [[this.grid - spacing, this.gridY], [this.grid, this.gridY - spacing], [this.grid, this.gridY + spacing]];
  	} else if (this.gridY == this.getBoardEnd()) {
  		this.liberties = [[this.grid - spacing, this.gridY], [this.grid + spacing, this.gridY], [this.grid, this.gridY - spacing]];
  	} else if (this.grid == padding) {
  		this.liberties = [[this.grid + spacing, this.gridY], [this.grid, this.gridY - spacing], [this.grid, this.gridY + spacing]];
  	} else if (this.gridY == padding) {
  		this.liberties = [[this.grid - spacing, this.gridY], [this.grid + spacing, this.gridY], [this.grid, this.gridY + spacing]];
  	} else {
  		this.liberties = [[this.grid + spacing, this.gridY], [this.grid - spacing, this.gridY], [this.grid, this.gridY + spacing], [this.grid, this.gridY - spacing]];
  	}

  	for (i = 0; i < this.liberties.length; i++) {
  		this.liberties[i][0] = Math.round((this.liberties[i][0] - padding) / spacing);
  		this.liberties[i][1] = Math.round((this.liberties[i][1] - padding) / spacing);
  	}

  }
}
