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
  tutorial2Setup(){
    this.inProgress = 2;
      var hint = "Place a black stone at (5,3) to take multiple white stones. Try it now!";
    var grid =   [[0,0,new Stone(calcPos(0),calcPos(2),2),0,0,0,0,0,0,0],
                  [0,new Stone(calcPos(1),calcPos(1),2),new Stone(calcPos(1),calcPos(2),1),new Stone(calcPos(1),calcPos(3),2),0,0,0,0,0,0],
                  [0,new Stone(calcPos(2),calcPos(1),2),new Stone(calcPos(2),calcPos(2),1),new Stone(calcPos(2),calcPos(3),2),0,0,0,0,0,0],
                  [0,new Stone(calcPos(3),calcPos(1),2),new Stone(calcPos(3),calcPos(2),1),new Stone(calcPos(3),calcPos(3),1),new Stone(calcPos(3),calcPos(4),2),0,0,0,0,0],
                  [0,new Stone(calcPos(4),calcPos(1),2),new Stone(calcPos(4),calcPos(2),1),new Stone(calcPos(4),calcPos(3),1),new Stone(calcPos(4),calcPos(4),2),0,0,0,0,0],
                  [0,0,new Stone(calcPos(5),calcPos(2),2),0,0,0,0,0,0,0],
                  [0,0,0,0,0,0,0,0,0,0],
                  [0,0,0,0,0,0,0,0,0,0],
                  [0,0,0,0,0,0,0,0,0,0],
                  [0,0,0,0,0,0,0,0,0,0],];
    return [hint, grid];
  }
}
