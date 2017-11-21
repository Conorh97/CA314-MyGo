class Match{
  playerOneScore = 0;
  playerTwoScore = 0;
  currentTurn = 0;
  constructor(p1name, p2name){
    this.p1name = p1name;
    this.p2name = p2name;
  }

  getNames(){
    // return the names of the players in the game, to be used in displaying player names in UI
  }

  getScore(){
    // calculating score at the end of the game.
  }

  whosTurn(){
    // returns which player's turn it is.
  }
}
