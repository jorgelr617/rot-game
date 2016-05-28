import {Hex} from "./classes/hex.js"

export class Map {

  constructor() {

		//these two objects will exist on the server and will track
		//the ids and ownership properties of the game elements
		this.serverHexes = {};
		this.serverNodes = {};

		//these two objects will exist on the client and will include everything
		//that the server objects contain as well as positioning information unique to the client
		this.clientHexes = {};
		this.clientNodes = {};
		
		this.minGameHexes = 3;
		this.maxGameHexes = 5;

		this.numberOfGameColumns = 2*(this.maxGameHexes - this.minGameHexes) + 1;
		this.numberOfColumns = this.numberOfGameColumns + 2;
		
		//TODO: calculate this variable based on the client screen size and the min and max game hexes
		//TODO: make this value available to the Hex and Node classes without passing it through the constructor
		this.hexRadius = 50;
	}

	//functions for creating the game data structure. They will execute on the server
	//and the two server data objects that they create will be sent to the clients

	createGameState() {
		
		let numOfHexesInColumn = this.minGameHexes;

		for (let colId = 0; colId < this.numberOfColumns; colId++) {
			
			if (colId < Math.floor(this.numberOfColumns/2)) {

				this.createColumn(numOfHexesInColumn, colId);
				numOfHexesInColumn++;

			} else {

				this.createColumn(numOfHexesInColumn, colId);
				numOfHexesInColumn--;

			}

		}

	}

	createColumn(numOfHexes, colId) {

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
			this.serverHexes[currentHex.hexIdArray] = currentHex;
			
			if(currentHex.leftChildNode.isInGame === true) {
				this.serverNodes[currentHex.leftChildNode.nodeIdArray] = currentHex.leftChildNode;
			}
			if(currentHex.rightChildNode.isInGame === true) {
				this.serverNodes[currentHex.rightChildNode.nodeIdArray] = currentHex.rightChildNode;
			}

		}
		
	}

	assignControlNodes() {
		for (let hexId in this.serverHexes) {
			let hex = this.serverHexes[hexId];
			if(hex.checkIfInGame()) {
				this.calcHexControlNodes(hex);
			}
		}
	}
	
	assignNodeNeighbors() {
		for (let nodeId in this.serverNodes) {
			let node = this.serverNodes[nodeId];
			if (node.isInGame) {
				this.calcNodeNeighbors(node);
			}
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
			if (this.serverNodes[idArray] !== undefined) {
				toServer.push(idArray);
			}
		});

		this.serverNodes[nodeIdArray].neighborsIdArray = toServer;

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
			nodeIdArray.push(this.serverHexes[topHexIdArray].leftChildNode.nodeIdArray);
			nodeIdArray.push(this.serverHexes[topHexIdArray].rightChildNode.nodeIdArray);

			//add bottom nodes
			nodeIdArray.push(hex.leftChildNode.nodeIdArray);
			nodeIdArray.push(hex.rightChildNode.nodeIdArray);

		if(hexIdArray[0] < 3) {

			//add left node
			leftHexIdArray[0] = hexIdArray[0] - 1;
			leftHexIdArray[1] = hexIdArray[1] - 1;
			nodeIdArray.push(this.serverHexes[leftHexIdArray].rightChildNode.nodeIdArray);

			//add right node
			rightHexIdArray[0] = hexIdArray[0] + 1;
			rightHexIdArray[1] = hexIdArray[1];
			nodeIdArray.push(this.serverHexes[rightHexIdArray].leftChildNode.nodeIdArray);

		} else if (hexIdArray[0] === 3) {

			//add left node
			leftHexIdArray[0] = hexIdArray[0] - 1;
			leftHexIdArray[1] = hexIdArray[1] - 1;
			nodeIdArray.push(this.serverHexes[leftHexIdArray].rightChildNode.nodeIdArray);

			//add right node
			rightHexIdArray[0] = hexIdArray[0] + 1;
			rightHexIdArray[1] = hexIdArray[1] - 1;
			nodeIdArray.push(this.serverHexes[rightHexIdArray].leftChildNode.nodeIdArray);

		} else {

			//add left node
			leftHexIdArray[0] = hexIdArray[0] - 1;
			leftHexIdArray[1] = hexIdArray[1];
			nodeIdArray.push(this.serverHexes[leftHexIdArray].rightChildNode.nodeIdArray);

			//add right node
			rightHexIdArray[0] = hexIdArray[0] + 1;
			rightHexIdArray[1] = hexIdArray[1] - 1;
			nodeIdArray.push(this.serverHexes[rightHexIdArray].leftChildNode.nodeIdArray);

		}

		for (let i in nodeIdArray) {
			this.serverNodes[nodeIdArray[i]].hexesThatItCanAffect.push(hexIdArray);
		}

		hex.setControlNodes(nodeIdArray);

	}

	
	

	//this is where we get each element from the server's data structure and assign it a position in the DOM

	//once we assign it a position, we store the elements in a data structure on the client similar
	// to what is on the server so that the two can communicate

	//once this client structure is created, the server will update the client data as the game progresses

	//once we have positions on the client-side, we can render the elements
	
	positionElements(startPoint) {

		let rowCounter = undefined;
		let hexIdArray = undefined;
		let point = startPoint;

		for (let colCounter = 0; colCounter < this.numberOfGameColumns + 2; colCounter++) {

			rowCounter = 0;

			while (rowCounter < this.maxGameHexes + 1) {

				hexIdArray = [];
				hexIdArray.push(colCounter);
				hexIdArray.push(rowCounter);

				if (this.serverHexes.hasOwnProperty(hexIdArray)) {

					//get hex from server and assign it (and its child nodes) a position
					let currentHex = this.serverHexes[hexIdArray];
					currentHex.setCenter(point);
					currentHex.setCorners();
					currentHex.positionChildNodes();

					//store the modified elements in the client data structure
					this.clientHexes[hexIdArray] = currentHex;

					if (currentHex.leftChildNode.isInGame === true) {
						this.clientNodes[currentHex.leftChildNode.nodeIdArray] = currentHex.leftChildNode;
					}
					if (currentHex.rightChildNode.isInGame === true) {
						this.clientNodes[currentHex.rightChildNode.nodeIdArray] = currentHex.rightChildNode;
					}
					point.moveY(Math.sqrt(3) * this.hexRadius);
				}

				rowCounter++;

			}

			//TODO: Refactor this switch statement into a loop - I had to break it out like this for debugging
			switch (colCounter) {
				case 0:
					point.moveY(this.calcNextColumnTopHexY(4));
					break;
				case 1:
					point.moveY(this.calcNextColumnTopHexY(5));
					break;
				case 2:
					point.moveY(this.calcNextColumnTopHexY(6));
					break;
				case 3:
					point.moveY(this.calcNextColumnTopHexY(6));
					break;
				case 4:
					point.moveY(this.calcNextColumnTopHexY(5));
					break;
				case 5:
					point.moveY(this.calcNextColumnTopHexY(4));
					break;
			}

			point.moveX(this.hexRadius*1.5);

		}
		
	}
	
	calcNextColumnTopHexY(hexCounter) {
		return (-1*Math.sqrt(3) * this.hexRadius * hexCounter)+ Math.sqrt(3)/2*this.hexRadius;
	};
	
	renderElements() {

		for (let hexId in this.clientHexes) {
			let hex = this.clientHexes[hexId];
				if (hex.isInGame === true) { hex.draw(); }
		}

		for (let nodeId in this.clientNodes) {
			let node = this.clientNodes[nodeId];
			if (node.isInGame === true) { node.draw(); }
		}
	}

}
