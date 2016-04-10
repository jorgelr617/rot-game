function Hex() {
  this.owner = 0;
  this.visited = false; // <-- used for initializing the map
  this.nodeIds = [];

  // initialize node ids
  for(var i = 0; i < 6; i++) {
    this.nodeIds.push(-1);
  }
}

/*
  Sets the id of the node at the given index
*/
Hex.prototype.setNodeId = function(id, index) {
  this.nodeIds[index] = id;
}

/*
  Gets the id of the node at the given index
*/
Hex.prototype.getNodeId = function(index) {
  return this.nodeIds[index];
}


module.exports = Hex;
