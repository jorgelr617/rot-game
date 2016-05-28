export class Node {
	
  constructor(nodeIdArray) {

		this.nodeIdArray = nodeIdArray;
		this.nodeIdString = "n" + this.nodeIdArray[0] + this.nodeIdArray[1] + this.nodeIdArray[2];

		this.hexesThatItCanAffect = [];
		this.neighborsIdArray = [];

		this.ownerId = null;

  }
	
	//server-side game state information

	addHexThatItCanAffect(hexIdArray) {
		this.hexesThatItCanAffect.push(hexIdArray);
	}

	setOwner(ownerId) {
		this.ownerId = ownerId;
	}
	
}
