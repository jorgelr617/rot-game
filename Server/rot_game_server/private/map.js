var hex = require("hex.js");
var node = require("node.js");
var game = require('game.js');


/*
  Radius: radius of the grid
  centerHex: the Hex in the center of the grid
*/
function Map(radius, center) {
  this.hexes = {};
  this.gameNodes = [];
  this.radius = radius;

  this.generateGrid();
  this.addNodes(0, 0, 0);
}

/*
  Set the hexagon at the axial position q, r
*/
Map.prototype.set = function(q, r, hex) {
  this.hexes[q + "," + r] = hex;
}

/*
  Gets the hexagon at the axial position q, r
*/
Map.prototype.get = function(q, r) {
  return this.hexes[q + "," + r];
}

/*
  Determines if a hex exists at q, r
*/
Map.prototype.exists = function(q, r) {
  return this.hexes[q + "," + r] != null;
}

/*
  Get the neighbors of the given hex at coordinate (q, r)
*/
Map.prototype.getNeighbors = function(q, r) {
  var neighbors = [];
  var directions = [
    {q: 0, r: -1},
    {q: 1, r: -1},
    {q: 1, r: 0},
    {q: 0, r: 1},
    {q: -1, r: 1},
    {q: -1, r: 0}
  ];

  for(var i = 0; i < directions.length; i++) {
    var newNeighbor = {
      q: q + directions[i].q,
      r: r + directions[i].r,
      index: i
    };
    if(this.get(newNeighbor.q, newNeighbor.r)) {
      neighbors.push(newNeighbor);
    }
  }
  return neighbors;
}

/*
  Gets the index of the neighbor.
  The index determines where that neigbor is relative to
  another hex.
  -1 indicates that that hex (q1, r1) and (q2, r2) are not neighbors.
*/
Map.prototype.getNeighborsIndex = function(q1, r1, q2, r2) {
  var directions = [
    {q: 0, r: -1},
    {q: 1, r: -1},
    {q: 1, r: 0},
    {q: 0, r: 1},
    {q: -1, r: 1},
    {q: -1, r: 0}
  ];
  for(var i = 0; i < directions.length; i++) {
    if(q2 == q1 + directions[i].q && r2 == r1 + directions[i].r) {
      return i;
    }
  }
  return -1;

}

/*
  Generates the hex grid
*/
Map.prototype.generateGrid = function() {
  for (var q = -this.radius; q <= this.radius; q++) {
      var r1 = Math.max(-this.radius, -q - this.radius);
      var r2 = Math.min(this.radius, -q + this.radius);
      for (var r = r1; r <= r2; r++) {
        var newHex = new Hex();
        this.set(q, r, newHex);
      }
  }
}

/*
  Add the hexes surrunding a given node,
  to that node.
*/
Map.prototype.addHexesToNodes = function() {
  for(var coord in this.hexes) {
    for(var i = 0; i < 6; i++) {
      var nodeId = this.hexes[coord].getNodeId(i);
      var node = this.gameNodes[nodeId];
      node.connectedHexes.push(coord);
    }
  }
}

/*
  Counts the number of hexes controlled by a given
  player.
*/
Map.prototype.countHexesControlledBy = function(player) {
  var count = 0;
  // each hex's control is already given
  // over to the given player when that player
  // selects that node, so it is unnecessary
  // to check the surrounding nodes of a given hex.
  for(var key in this.hexes) {
    if(this.hexes[key] == player) {
      count += 1;
    }
  }

  return count;
}



/*
  Checks to see if the given hex can be
  controlled by a given player.
*/
Map.prototype.canClaim = function(player, id) {
  var adjNodes = [];
  // get all adjacent nodes to the given nodeId
  for(var i = 0; i < this.gameNodes[id].connectedHexes.length; i++) {
    var hex = this.hexes[this.gameNodes[id].connectedHexes[i]];

    // find the nodes adjacent to the given node
    for(var j = 0; j < 6; j++) {
      if(hex.getNodeId(j) == id) {
        adjNodes.push(hex.getNodeId((j+5) % 6))
        adjNodes.push(hex.getNodeId((j+1) % 6))
      }
    }
  }
  for(var i = 0; i < adjNodes.length; i++) {
    if(this.gameNodes[adjNodes[i]].owner == player) {
      return true;
    }
  }
  return false;
}

/*
  Give a given node to a given player.
*/
Map.prototype.claim = function(player, id) {
  // gives a given node to a player.
  if(this.canClaim(player, id)) {
    this.gameNodes[id].owner = player;
  }

  // update the hexes
  this.assignHexes();
}


/*
  Assign hexes to their corresponding players.
*/
Map.prototype.assignHexes = function() {
  for(var hex in this.hexes) {
    var hex = this.hexes[hex];

    var ownerships = [];
    // populate the ownership array
    for(var i = 0; i < GameProperties.teamColors.length; i++) {
      ownerships.push(0);
    }

    for(var i = 0; i < 6; i++) {
      ownerships[this.gameNodes[hex.getNodeId(i)].owner] += 1;
    }

    // find the majority
    var maxIndex = 1; // player 0 does not count
    for(var i = 2; i < ownerships.length; i++) {
      if(ownerships[maxIndex] < ownerships[i]) {
        maxIndex = i;
      }
    }
    if(ownerships[maxIndex] != 0)
      hex.owner = maxIndex;
    else
      hex.owner = 0;
  }
}

/*
  Adds the surrounding nodes to the given hex
*/
Map.prototype.addNodes = function(q, r, lastId) {
  var newNodes = [];
  var lastId = lastId;

  // fill in any nodes neighboring to this one
  var neighbors = this.getNeighbors(q, r);

  // Fill in any existing nodes from neighbors that have already been visited.
  for(var i = 0; i < neighbors.length; i++) {
    if(this.get(neighbors[i].q, neighbors[i].r).visited) {
      this.get(q, r).setNodeId(this.get(neighbors[i].q, neighbors[i].r).getNodeId((neighbors[i].index + 2) % 6), (neighbors[i].index + 4) % 6)
      this.get(q, r).setNodeId(this.get(neighbors[i].q, neighbors[i].r).getNodeId((neighbors[i].index + 1) % 6), (neighbors[i].index + 5) % 6)
    }
  }

  // add nodes to current hex
  for(var i = 0; i < 6; i++) {
    if(this.get(q, r).getNodeId(i) == -1) {
      this.get(q, r).setNodeId(lastId, i);
      var newNode = new Node();
      newNode.owner = 0;
      this.gameNodes.push(newNode);
      lastId += 1;
    }
  }
  this.get(q, r).visited = true;

  // Get nodes from the neighbors of this hex that haven't been visited
  for(var i = 0; i < neighbors.length; i++) {
    if(!this.get(neighbors[i].q, neighbors[i].r).visited) {
      this.addNodes(neighbors[i].q, neighbors[i].r, lastId)
    }
  }
}


module.exports = Map;
