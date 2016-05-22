import {Node} from "./node.js";

export class Player {
	
	constructor(id) {
		
		this.id = id;
		this.controlledHexes = [];
		this.ownedNodes = [];
		this.turnNum = null;
		
	}
	
	claimNode(node) {
		node.setOwner(this.id);
		this.ownedNodes.push(node.nodeIdArray);
	}
	
	
}