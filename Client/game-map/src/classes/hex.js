import {Node} from "./node.js"

export class Hex {
	
	constructor(hexIdArray) {

		this.hexIdArray = hexIdArray.slice(0);
		this.hexIdString = "H" + this.hexIdArray[0] + this.hexIdArray[1];
		
		this.controlNodes = [];
		
		this.ownerId = null;
		
	}
	
	setControlNodes(arrayOfNodes) {
		this.controlNodes = arrayOfNodes;
	}
	
}
