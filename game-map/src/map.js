import {Node} from "./classes/node.js";
import {Hex} from "./classes/hex.js";
import {Player} from "./classes/player.js";

export class Map {

	constructor() {
		
		this.hexes = {};
		this.nodes = {};
		this.players = {};

		this.minGameHexes = 3;
		this.maxGameHexes = 5;

		this.numberOfGameColumns = 2 * (this.maxGameHexes - this.minGameHexes) + 1;
		this.numberOfColumns = this.numberOfGameColumns + 2;

	}

	//functions for creating game objects

	createGameState() {

		let numOfHexesInColumn = this.minGameHexes;

		for (let colId = 0; colId < this.numberOfColumns; colId++) {

			if (colId < Math.floor(this.numberOfColumns / 2)) {

				this.createHexColumn(numOfHexesInColumn, colId);
				numOfHexesInColumn++;

			} else {

				this.createHexColumn(numOfHexesInColumn, colId);
				numOfHexesInColumn--;

			}
		}
	}

	createHexColumn(numOfHexes, colId) {

		this.colId = colId;

		for (let rowCounter = 0; rowCounter < numOfHexes; rowCounter++) {

			//creates a two element array to uniquely identify each hex
			let hexIdArray = [];
			hexIdArray.push(this.colId);
			hexIdArray.push(rowCounter);

			let currentHex = new Hex(hexIdArray);

			if (hexIdArray[0] !== 0) {
				if (hexIdArray[0] !== 6) {
					if (hexIdArray[1] !== 0) {
						this.hexes[hexIdArray] = currentHex;
					}
				}
			}

			this.createChildNodes(currentHex.hexIdArray);
			
		}

	}

	createChildNodes(hexIdArray) {

		let nodeIdArray = hexIdArray.slice(0);

		nodeIdArray.push("R");
		let rightChildNode = new Node(nodeIdArray.slice(0));
		if (hexIdArray[0] < 6) {
			this.nodes[nodeIdArray] = rightChildNode;
		}

		nodeIdArray.splice(2, 1, "L");
		let leftChildNode = new Node(nodeIdArray.slice(0));
		if (hexIdArray[0] > 0) {
			this.nodes[nodeIdArray] = leftChildNode;
		}

	};

	createPlayers(playerIds) {
		playerIds.forEach((id) => {
			this.players[id] = new Player(id);
		});
	}


	//functions for relating objects to each other

	assignControlNodes() {
		for (let hexId in this.hexes) {
			let hex = this.hexes[hexId];
			this.calcHexControlNodes(hex);
		}
	}

	calcHexControlNodes(hex) {

		let hexIdArray = hex.hexIdArray.slice(0);
		let nodeIdArray = [];
		let topHexIdArray = [];
		let leftHexIdArray = [];
		let rightHexIdArray = [];

		//add top nodes
		topHexIdArray[0] = hexIdArray[0];
		topHexIdArray[1] = hexIdArray[1] - 1;
		nodeIdArray.push(topHexIdArray.concat('L'));
		nodeIdArray.push(topHexIdArray.concat('R'));

		//add bottom nodes
		nodeIdArray.push(hex.hexIdArray.concat('L'));
		nodeIdArray.push(hex.hexIdArray.concat('R'));

		if (hexIdArray[0] < 3) {

			//add left node
			leftHexIdArray[0] = hexIdArray[0] - 1;
			leftHexIdArray[1] = hexIdArray[1] - 1;
			nodeIdArray.push(leftHexIdArray.concat('R'));

			//add right node
			rightHexIdArray[0] = hexIdArray[0] + 1;
			rightHexIdArray[1] = hexIdArray[1];
			nodeIdArray.push(rightHexIdArray.concat('L'));

		} else if (hexIdArray[0] === 3) {

			//add left node
			leftHexIdArray[0] = hexIdArray[0] - 1;
			leftHexIdArray[1] = hexIdArray[1] - 1;
			nodeIdArray.push(leftHexIdArray.concat('R'));

			//add right node
			rightHexIdArray[0] = hexIdArray[0] + 1;
			rightHexIdArray[1] = hexIdArray[1] - 1;
			nodeIdArray.push(rightHexIdArray.concat('L'));

		} else {

			//add left node
			leftHexIdArray[0] = hexIdArray[0] - 1;
			leftHexIdArray[1] = hexIdArray[1];
			nodeIdArray.push(leftHexIdArray.concat('R'));

			//add right node
			rightHexIdArray[0] = hexIdArray[0] + 1;
			rightHexIdArray[1] = hexIdArray[1] - 1;
			nodeIdArray.push(rightHexIdArray.concat('L'));

		}

		let gameNodes = [];

		nodeIdArray.forEach((nodeId) => {
			if(nodeId in this.nodes) {
				gameNodes.push(nodeId);
			}
		});

		gameNodes.forEach((nodeId) => {
				this.nodes[nodeId].addHexThatItCanAffect(hexIdArray);
		});

		this.hexes[hexIdArray].setControlNodes(gameNodes);

	}

	assignNodeNeighbors() {
		for (let nodeId in this.nodes) {
			let node = this.nodes[nodeId];
			this.calcNodeNeighbors(node);
		}
	}

	calcNodeNeighbors(node) {

		let nodeIdArray = node.nodeIdArray.slice(0);
		let neighborsIdArray = [];
		let firstNeighbor = [];
		let secondNeighbor = [];
		let thirdNeighbor = [];

		if (nodeIdArray[2] === "L") {

			firstNeighbor[0] = nodeIdArray[0];
			firstNeighbor[1] = nodeIdArray[1];
			firstNeighbor[2] = "R";

			neighborsIdArray.push(firstNeighbor);

			if (nodeIdArray[0] > 3) {

				secondNeighbor[0] = nodeIdArray[0] - 1;
				secondNeighbor[1] = nodeIdArray[1];
				secondNeighbor[2] = "R";
				neighborsIdArray.push(secondNeighbor);

				thirdNeighbor[0] = nodeIdArray[0] - 1;
				thirdNeighbor[1] = nodeIdArray[1] + 1;
				thirdNeighbor[2] = "R";
				neighborsIdArray.push(thirdNeighbor);

			} else {

				secondNeighbor[0] = nodeIdArray[0] - 1;
				secondNeighbor[1] = nodeIdArray[1] - 1;
				secondNeighbor[2] = "R";
				neighborsIdArray.push(secondNeighbor);

				thirdNeighbor[0] = nodeIdArray[0] - 1;
				thirdNeighbor[1] = nodeIdArray[1];
				thirdNeighbor[2] = "R";
				neighborsIdArray.push(thirdNeighbor);
			}

		} else {

			firstNeighbor[0] = nodeIdArray[0];
			firstNeighbor[1] = nodeIdArray[1];
			firstNeighbor[2] = "L";
			neighborsIdArray.push(firstNeighbor);

			if (nodeIdArray[0] > 2) {

				secondNeighbor[0] = nodeIdArray[0] + 1;
				secondNeighbor[1] = nodeIdArray[1] - 1;
				secondNeighbor[2] = "L";
				neighborsIdArray.push(secondNeighbor);

				thirdNeighbor[0] = nodeIdArray[0] + 1;
				thirdNeighbor[1] = nodeIdArray[1];
				thirdNeighbor[2] = "L";
				neighborsIdArray.push(thirdNeighbor);

			} else {

				secondNeighbor[0] = nodeIdArray[0] + 1;
				secondNeighbor[1] = nodeIdArray[1];
				secondNeighbor[2] = "L";
				neighborsIdArray.push(secondNeighbor);

				thirdNeighbor[0] = nodeIdArray[0] + 1;
				thirdNeighbor[1] = nodeIdArray[1] + 1;
				thirdNeighbor[2] = "L";
				neighborsIdArray.push(thirdNeighbor);

			}

		}

		let toServer = [];

		neighborsIdArray.forEach((idArray) => {
			if (this.nodes[idArray] !== undefined) {
				toServer.push(idArray);
			}
		});

		this.nodes[nodeIdArray].neighborsIdArray = toServer;

	}

	
	//functions for changing properties of game objects

	setNodeOwner(playerId, nodeIdArray) {
		this.nodes[nodeIdArray].setOwner(playerId);
		this.players[playerId].ownedNodes.push(nodeIdArray);
		console.log(this.nodes[nodeIdArray]);
	}

}