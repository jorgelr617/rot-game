// Constructor
function Game(firstPlayer) {
  // always initialize all instance properties
  this.players[0] = firstPlayer; //This array should contain the player objects for the 4 people playing the game.  Included session id, etc.  By default the person that created the game will be player1
  this.turn = 0;
}

// class methods
Game.prototype.addPlayer = function(newPlayer) {
    //This method adds an additional player to the game.  Cannot have more than 4 players
    if (this.players.length < 4) {
        this.players.push(newPlayer);
    }
};
Game.prototype.removePlayer = function(newPlayer) {
    //This method removes people from the game
    //write code to remove player object from players array
};
// export the class
module.exports = Game;