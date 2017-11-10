class Stone{

  constructor(x,y,colour){
    this.x = x;
    this.y = y;
    this.colour = colour
  }
  getPosition(){
    return [this.x, this.y];
  }

  getSurroundingLiberties(){
    //Returns a list of the surrounding points and the stones on them.
  }
}
