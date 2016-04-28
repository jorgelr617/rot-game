import {Hex} from "./hex.js"
import {Node} from "./node.js"
import {GameProperties} from "./gameProperties.js"

export class Map {

  constructor(hexSize, nodeRadius, minHexes, maxHexes) {
		
		this.hexColumns = [];
		this.nodes = {};

		this.hexSize = hexSize;
		this.nodeRadius = nodeRadius;
		this.minHexes = minHexes;
		this.maxHexes = maxHexes;
		
	}

	createColumn(startPoint) {

		let point = startPoint;
		let column = [];

		for (let i = 0; i < this.minHexes; i++) {

			let currentHex = new Hex(point, this.hexSize, this.nodeRadius);
			
			currentHex.createChildNodes();
			currentHex.draw();
			
			column.push(currentHex);
			
			point.moveY(Math.sqrt(3)*this.hexSize);
		}

		column.forEach(function(hex) {
			hex.leftChildNode.draw();
			hex.rightChildNode.draw();
		})

	}
	
}
