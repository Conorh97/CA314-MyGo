class Player{
  StonesPlaced = 0;
  totalTerritory = 0;
  isTurn = false;

  constructor(colour){
    this.colour = colour;
  }

  placeStone(){
    //places a stone on the board by adding it to the list of placed stones.
  }

  calculateScore(){
    // used for calculating player score at the end of the game.
  }

  getTerritory(){
    // returns the territory held by the player at the end of the game, used to calculate score.
  }

  endTurn(){
    // skips the players turn
  }
}

class Player1 extends Player{
  constructor(colour){
    super(colour);
  }

  assignColour(){
    // sets colour for player
  }

  calculateScore(){
    // add extra 0.5 for white colour stone.
  }
}

class Player2 extends Player{
  constructor(colour){
    super(colour);
  }

  assignColour(){
    // sets colour for player
  }

  calculateScore(){
    // add extra 0.5 for white colour stone.
  }
}
