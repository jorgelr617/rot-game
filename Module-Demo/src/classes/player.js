import {Node} from "./node.js";

export class Player {
	
	constructor(id) {
		
		this.id = id;
		this.color = undefined;
		this.hexs = [];
		this.ownedNodes = [];
		this.turnNum = undefined;
		
	}
	
	claimNode(node) {
		node.setOwner(this.id);
		this.ownedNodes.push(node);
	}
	
	
}