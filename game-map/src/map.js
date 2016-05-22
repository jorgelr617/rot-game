import {Hex} from "./classes/hex.js";
import {Player} from "./classes/player.js";

module.exports = {

	setup: function () {
		
		this.hexes = {};
		this.nodes = {};
		this.players = {};

		this.minGameHexes = 3;
		this.maxGameHexes = 5;

		this.numberOfGameColumns = 2 * (this.maxGameHexes - this.minGameHexes) + 1;
		this.numberOfColumns = this.numberOfGameColumns + 2;

	},
	
	createGameState: function () {

		let numOfHexesInColumn = this.minGameHexes;

		for (let colId = 0; colId < this.numberOfColumns; colId++) {

			if (colId < Math.floor(this.numberOfColumns / 2)) {

				this.createColumn(numOfHexesInColumn, colId);
				numOfHexesInColumn++;

			} else {

				this.createColumn(numOfHexesInColumn, colId);
				numOfHexesInColumn--;

			}
		}
	},

	createColumn: function(numOfHexes, colId) {

		this.colId = colId;

		for (let rowCounter = 0; rowCounter < numOfHexes; rowCounter++) {
			// debugger;
			//creates a two element array to uniquely identify each hex
			let hexIdArray = [];
			hexIdArray.push(this.colId);
			hexIdArray.push(rowCounter);

			let currentHex = new Hex(hexIdArray);

			//each hex will be the parent of two child nodes
			//so that we can easily locate any node and also not have duplicates
			currentHex.createChildNodes();

			//here is were we build the data objects that the server will manage
			this.hexes[currentHex.hexIdArray] = currentHex;

			if (currentHex.leftChildNode.isInGame === true) {
				this.nodes[currentHex.leftChildNode.nodeIdArray] = currentHex.leftChildNode;
			}
			if (currentHex.rightChildNode.isInGame === true) {
				this.nodes[currentHex.rightChildNode.nodeIdArray] = currentHex.rightChildNode;
			}

		}

	},

	assignControlNodes: function() {
		for (let hexId in this.hexes) {
			let hex = this.hexes[hexId];
			if (hex.checkIfInGame()) {
				this.calcHexControlNodes(hex);
			}
		}
		
		
	},

	calcHexControlNodes: function(hex) {

		let hexIdArray = hex.hexIdArray.slice(0);
		let nodeIdArray = [];
		let topHexIdArray = [];
		let leftHexIdArray = [];
		let rightHexIdArray = [];

		//add top nodes
		topHexIdArray[0] = hexIdArray[0];
		topHexIdArray[1] = hexIdArray[1] - 1;
		nodeIdArray.push(this.hexes[topHexIdArray].leftChildNode.nodeIdArray);
		nodeIdArray.push(this.hexes[topHexIdArray].rightChildNode.nodeIdArray);

		//add bottom nodes
		nodeIdArray.push(hex.leftChildNode.nodeIdArray);
		nodeIdArray.push(hex.rightChildNode.nodeIdArray);

		if (hexIdArray[0] < 3) {

			//add left node
			leftHexIdArray[0] = hexIdArray[0] - 1;
			leftHexIdArray[1] = hexIdArray[1] - 1;
			nodeIdArray.push(this.hexes[leftHexIdArray].rightChildNode.nodeIdArray);

			//add right node
			rightHexIdArray[0] = hexIdArray[0] + 1;
			rightHexIdArray[1] = hexIdArray[1];
			nodeIdArray.push(this.hexes[rightHexIdArray].leftChildNode.nodeIdArray);

		} else if (hexIdArray[0] === 3) {

			//add left node
			leftHexIdArray[0] = hexIdArray[0] - 1;
			leftHexIdArray[1] = hexIdArray[1] - 1;
			nodeIdArray.push(this.hexes[leftHexIdArray].rightChildNode.nodeIdArray);

			//add right node
			rightHexIdArray[0] = hexIdArray[0] + 1;
			rightHexIdArray[1] = hexIdArray[1] - 1;
			nodeIdArray.push(this.hexes[rightHexIdArray].leftChildNode.nodeIdArray);

		} else {

			//add left node
			leftHexIdArray[0] = hexIdArray[0] - 1;
			leftHexIdArray[1] = hexIdArray[1];
			nodeIdArray.push(this.hexes[leftHexIdArray].rightChildNode.nodeIdArray);

			//add right node
			rightHexIdArray[0] = hexIdArray[0] + 1;
			rightHexIdArray[1] = hexIdArray[1] - 1;
			nodeIdArray.push(this.hexes[rightHexIdArray].leftChildNode.nodeIdArray);

		}

		for (let i in nodeIdArray) {
			this.nodes[nodeIdArray[i]].hexesThatItCanAffect.push(hexIdArray);
		}

		hex.setControlNodes(nodeIdArray);

	},
	
	createPlayers: function(playerIds) {
		playerIds.forEach((id) => {
			this.players[id] = new Player(id);
		});
	},
	
	setNodeOwner: function(playerId, nodeIdArray) {
		this.nodes[nodeIdArray].setOwner(playerId);
		this.players[playerId].ownedNodes.push(nodeIdArray);
		console.log(this.nodes[nodeIdArray]);
	}

};