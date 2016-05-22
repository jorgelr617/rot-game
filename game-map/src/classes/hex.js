import {Node} from "./node.js"

export class Hex {
	
	constructor(hexIdArray) {

		this.hexIdArray = hexIdArray.slice(0);
		this.hexIdString = "H" + this.hexIdArray[0] + this.hexIdArray[1];
		
		this.controlNodes = [];

		this.leftChildNode = undefined;
		this.rightChildNode = undefined;
		
		this.isInGame = this.checkIfInGame();
		
	}

	//server-side game state information

	checkIfInGame() {
		//if the hex is in the left-most column, it is not in the game.
		if (this.hexIdArray[0] === 0) {
			return false;
		//if the hex is in the right-most column, it is not in the game.
		} else if (this.hexIdArray[0] === 6) {
			return false;
			//finally, if the hex is not the top hex in the column, the hex is in the game.
		} else return this.hexIdArray[1] !== 0;
	}

	createChildNodes() {

		let nodeIdArray = this.hexIdArray.slice(0);
		nodeIdArray.push("R");
		this.rightChildNode = new Node(nodeIdArray.slice(0));

		nodeIdArray.splice(2, 1, "L");
		this.leftChildNode = new Node(nodeIdArray.slice(0));
		
		if(this.hexIdArray[0] === 0)	{
			this.leftChildNode.isInGame = false;
		}
		
		if(this.hexIdArray[0] === 6) {
			this.rightChildNode.isInGame = false;
		}
		
	};
	
	setControlNodes(arrayOfNodes) {
		this.controlNodes = arrayOfNodes;
	}
	
	
}
