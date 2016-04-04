import {Hex} from "./hex.js"
import {Node} from "./node.js"
import {GameProperties} from "./gameProperties.js"
/*
  A hexagonal shapped hex map with nodes surrounding
  each hex.


  TODO:



  Access individual hex
  Access individual node
  Owner of hex

  Hex:
    Ownership
  Node:
    Ownership
*/


export class Map {

  /*
    Radius: radius of the grid
    centerHex: the Hex in the center of the grid
  */
  constructor(context, radius, nodeRadius, hexSize, center) {
    this.context = context;
    this.playerTurn = 1;
    this.playerCount = 4;

    this.hexes = {};
    this.nodes = [];
    this.radius = radius;
    this.center = center;

    this.nodeRadius = nodeRadius;
    this.hexSize = hexSize;


    // build the hex grid (from redblog hex grids)
    this.hexOrdering = []; // keeps track of the order in which each hex is added
    this.generateGrid();


    // color center hex
    //this.get(0, 0).fill = "green";

    // Test getNeighbors function
    /*
    var neighbors = this.getNeighbors(1, 1);

    for(var i = 0; i < neighbors.length; i++) {
      this.get(neighbors[i].q, neighbors[i].r).fill = "orange";
    }
    */

    // Test adding nodes
    this.addNodes(0, 0, 0);

    //console.log(this.hexes);
    //console.log(this.nodes);



    // add nodes to all the hexes starting at the center hex

  }




  /*
    Set the hexagon at the axial position q, r
  */
  set(q, r, hex) {
    this.hexes[q + "," + r] = hex;
  }


  // TODO: add another set function with two parameters if possible

  /*
    Gets the hexagon at the axial position q, r
  */
  get(q, r) {
    return this.hexes[q + "," + r];
  }

  /*
    Determines if a hex exists at q, r
  */
  exists(q, r) {
    return this.hexes[q + "," + r] != null;
  }

  // TODO: add another get function with one parameters if possible

  /*
    Get the neighbors of the given hex at coordinate (q, r)
  */
  getNeighbors(q, r) {
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
  getNeighborsIndex(q1, r1, q2, r2) {
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
  generateGrid() {
    for (var q = -this.radius; q <= this.radius; q++) {
        var r1 = Math.max(-this.radius, -q - this.radius);
        var r2 = Math.min(this.radius, -q + this.radius);
        for (var r = r1; r <= r2; r++) {
          var screenCoord = this.hexToPixelFlat(q, r, this.hexSize);
          var newHex = new Hex(this.context, this.center.x + screenCoord.x, this.center.y + screenCoord.y, this.hexSize);
          newHex.label = q + "," + r;
          this.set(q, r, newHex);
          this.hexOrdering.push({q: q, r: r}) // for keeping track of how hexes are placed
        }
    }
  }

  /*
    Add the hexes surrunding a given node,
    to that node.
  */
  addHexesToNodes() {
    for(var coord in this.hexes) {
      for(var i = 0; i < 6; i++) {
        var nodeId = this.hexes[coord].getNodeId(i);
        var node = this.nodes[nodeId];
        node.connectedHexes.push(coord);
      }
    }
  }

  /*
    Counts the number of hexes controlled by a given
    player.
  */
  countHexesControlledBy(player) {
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

    TODO: There are duplicates when creating the
    list of adjNodes. One way to fix this would be by looking
    at a pattern between node index. I know that one node has id (1,3)
    another (3, 5), and another (1, 5). A google drawing of this is stored
    in the in the google drive. (the diagram may be wrong or something... ???)
  */
  canClaim(player, id) {
    var adjNodes = [];
    // get all adjacent nodes to the given nodeId
    for(var i = 0; i < this.nodes[id].connectedHexes.length; i++) {
      var hex = this.hexes[this.nodes[id].connectedHexes[i]];

      // find the nodes adjacent to the given node
      for(var j = 0; j < 6; j++) {
        if(hex.getNodeId(j) == id) {
          adjNodes.push(hex.getNodeId((j+5) % 6))
          adjNodes.push(hex.getNodeId((j+1) % 6))
        }
      }
    }
    for(var i = 0; i < adjNodes.length; i++) {
      if(this.nodes[adjNodes[i]].owner == player) {
        return true;
      }
    }
    return false;




    // if they are all owned by the player return true
  }

  /*
    Give a given node to a given player.
  */
  claim(player, id) {
    // gives a given node to a player.
    if(this.canClaim(player, id)) {
      this.nodes[id].owner = player;
    }

    // update the hexes
    this.assignHexes();
  }


  /*
    Assign hexes to their corresponding players.
  */
  assignHexes() {
    for(var hex in this.hexes) {
      var hex = this.hexes[hex];

      var ownerships = [];
      // populate the ownership array
      for(var i = 0; i < GameProperties.teamColors.length; i++) {
        ownerships.push(0);
      }

      for(var i = 0; i < 6; i++) {
        ownerships[this.nodes[hex.getNodeId(i)].owner] += 1;
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
  addNodes(q, r, lastId) {
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
        var corner = this.get(q, r).corner(i);
        var newNode = new Node(this.context, corner.x, corner.y, this.nodeRadius);
        newNode.owner = 0;
        newNode.label = lastId + "";
        this.nodes.push(newNode);
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


  /*
    Draws the entire map.
  */
  draw() {
    for(var hex in this.hexes) {
      this.hexes[hex].draw();
    }

    for(var i = 0; i < this.nodes.length; i++) {
      this.nodes[i].draw();
    }
  }



  /*
    Checks all the nodes to see if they have been clicked.
  */
  nodeClicked(screenX, screenY) {
    for(var i = 0; i < this.nodes.length; i++) {
      if(this.nodes[i].clicked(screenX, screenY)) {
        console.log("Player Turn: " + this.playerTurn);
        console.log("Node Id: " + i);
        console.log("Player Color: " + GameProperties.teamColors[this.playerTurn]);
        if(this.canClaim(this.playerTurn, i)) {
          console.log("Claimed: " + i);
          this.claim(this.playerTurn, i);
          this.playerTurn = 1 + (this.playerTurn + 1) % (this.playerCount - 1);
          this.draw();
        }
      }
    }
  }







  /*
    Converts a hex to a pixel for the pointy hex layout.
    Taken from https://github.com/Bockit/hex
  */
  hexToPixelPointy (q, r, size) {
    let x = size * Math.sqrt(3) * (q + r / 2)
    let y = size * (3 / 2) * r
    return {x: x, y: y};
  }

  /*
    Converts a hex to a pixel for the flat hex layout.
    Taken from https://github.com/Bockit/hex
  */
  hexToPixelFlat (q, r, size) {
    let x = size * (3 / 2) * q
    let y = size * Math.sqrt(3) * (r + q / 2)
    return {x: x, y: y};
  }


}
