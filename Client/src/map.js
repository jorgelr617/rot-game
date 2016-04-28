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
			
			column.push(currentHex);
			
			point.moveY(this.hexSize);
		}

		column.forEach(function(hex) {
			hex.draw();
		})

	}
	
}
