class Tutorial{
  constructor(board){
    this.board = board;
    this.inProgress = 0;
  }

  tutorial1Setup(){
    this.inProgress = 1;
    var hint = "A black stone at (0,1) will take the white stone. Try it now!";
    var grid = [[new Stone(calcPos(0),calcPos(0),1),0,0,0,0,0,0,0,0,0],
                  [new Stone(calcPos(1),calcPos(0),2),0,0,0,0,0,0,0,0,0],
                  [0,0,0,0,0,0,0,0,0,0],
                  [0,0,0,0,0,0,0,0,0,0],
                  [0,0,0,0,0,0,0,0,0,0],
                  [0,0,0,0,0,0,0,0,0,0],
                  [0,0,0,0,0,0,0,0,0,0],
                  [0,0,0,0,0,0,0,0,0,0],
                  [0,0,0,0,0,0,0,0,0,0],
                  [0,0,0,0,0,0,0,0,0,0],];
    return [hint, grid];
  }
}
