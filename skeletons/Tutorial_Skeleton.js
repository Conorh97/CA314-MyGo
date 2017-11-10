class Tutorial{
  scenarios = // dictionary of all tutorials text, board layouts.
  isComplete = false;
  constructor(scenNum){
    scenario = scenarios[scenNum];
    fillScenarioBoard(scenario[1]);
    displayInstructions();
  }

  displayInstructions(){
    // print Tutorial instructions
  }

  analysePlayerMove(){
    // return whether the player is right or wrong
    giveFeedback() // to inform where the player went wrong
  }

  giveFeedback(){
    // provides feedback to player based on move
    // if correct set isComplete to True
  }

}
