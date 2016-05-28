import {Node} from "./classes/node.js";
import {Hex} from "./classes/hex.js";
import {Player} from "./classes/player.js";

export class Map {

  constructor(nodes, hexes, players) {
		
		this.nodes = nodes;
		this.hexes = hexes;
		this.players = players;
		
		this.minGameHexes = 3;
		this.maxGameHexes = 5;

		this.numberOfGameColumns = 2*(this.maxGameHexes - this.minGameHexes) + 1;
		this.numberOfColumns = this.numberOfGameColumns + 2;
		
		//TODO: calculate this variable based on the client screen size and the min and max game hexes
		//TODO: make this value available to the Hex and Node classes without passing it through the constructor
		this.hexRadius = 50;
	}

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

				//get hex from server and assign it (and its child nodes) a position
				let currentHex = new Hex(hexIdArray);
				currentHex.setCenter(point);
				currentHex.setCorners();
				this.positionChildNodes(currentHex);

				if (this.hexes.hasOwnProperty(hexIdArray)) {
					//store the modified elements in the client data structure
					this.hexes[hexIdArray] = currentHex;
				}

				point.moveY(Math.sqrt(3) * this.hexRadius);

				rowCounter++;

			}

			//TODO: Refactor this switch statement into a loop - I had to break it out like this for debugging
			switch (colCounter) {
				case 0:
					point.moveY(this.calcNextColumnTopHexY(7));
					break;
				case 1:
					point.moveY(this.calcNextColumnTopHexY(7));
					break;
				case 2:
					point.moveY(this.calcNextColumnTopHexY(7));
					break;
				case 3:
					point.moveY(this.calcNextColumnTopHexY(6));
					break;
				case 4:
					point.moveY(this.calcNextColumnTopHexY(6));
					break;
				case 5:
					point.moveY(this.calcNextColumnTopHexY(6));
					break;
			}
			// point.moveY(this.calcNextColumnTopHexY(7));
			point.moveX(this.hexRadius*1.5);

		}

	}
	
	positionChildNodes(hex) {

		let leftNode = new Node(hex.hexIdArray.concat('L'));
		let rightNode = new Node(hex.hexIdArray.concat('R'));

		let cornerPoint2 = hex.calcCorner(2);
		leftNode.setCenter(cornerPoint2);

		let cornerPoint1 = hex.calcCorner(1);
		rightNode.setCenter(cornerPoint1);

		if (this.nodes.hasOwnProperty(leftNode.nodeIdArray)) {
			this.nodes[leftNode.nodeIdArray] = leftNode;
		}

		if (this.nodes.hasOwnProperty(rightNode.nodeIdArray)) {
			this.nodes[rightNode.nodeIdArray] = rightNode;
		}
	}

	calcNextColumnTopHexY(hexCounter) {
		return (-1*Math.sqrt(3) * this.hexRadius * hexCounter)+ Math.sqrt(3)/2*this.hexRadius;
	};
	
	renderElements() {

		for (let hexId in this.hexes) {
			let hex = this.hexes[hexId];
				hex.draw();
		}

		for (let nodeId in this.nodes) {
			let node = this.nodes[nodeId];
				node.draw();
		}
	}

}
