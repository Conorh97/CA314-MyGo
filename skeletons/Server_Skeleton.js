class Server{
  status;
  p1Connected;
  p2Connected;

  getStatus(){
    // returns status of the server, e.g. live, offline
  }

  connectPlayer(){
    // connect a new player to a match. Once a player joins, game status is set to live
    // p1Connected = true after 1st player joins.
    // p2connected = true after 2nd player joins.
  }

  disconnectPlayer(){
    // remove a player from a match.
    // resets the playerConnected variables.
  }
}
