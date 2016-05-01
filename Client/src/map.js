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

	drawHexes() {
		this.hexColumns.forEach(function (column) {
			column.forEach(function(hex){
				hex.draw();
			});
		});
	}

	drawNodes() {
		this.hexColumns.forEach(function (column) {
			column.forEach(function(hex){
				hex.leftChildNode.draw();
				hex.rightChildNode.draw();
			});
		});
	}

	calcHexShiftY(hexCounter) {
		return (-1*Math.sqrt(3) * this.hexSize * hexCounter)+ Math.sqrt(3)/2*this.hexSize;
	};
	
	createAllColumns(startPoint) {

		startPoint.moveX(-this.hexSize*(this.minHexes+1));
		startPoint.moveY(-this.hexSize*Math.sqrt(3)*1.25);

		let numberOfColumns = (this.maxHexes - this.minHexes)*2 + 1;
		let currentPoint = startPoint;
		let currentColumn = [];
		let hexCounter = this.minHexes-1;

		for (let i = 0; i < numberOfColumns; i++) {

			if (i < Math.floor(numberOfColumns/2)) {

					currentColumn = this.createColumn(currentPoint, hexCounter);

					hexCounter++;

					currentPoint.moveX(this.hexSize*1.5);
					currentPoint.moveY(this.calcHexShiftY(hexCounter));

				
			} else if(i === Math.floor(numberOfColumns/2)) {

				currentColumn = this.createColumn(currentPoint, hexCounter);

				hexCounter--;

				currentPoint.moveX(this.hexSize*1.5);
				currentPoint.moveY(this.calcHexShiftY(hexCounter+1));
				
			} else {

					currentColumn = this.createColumn(currentPoint, hexCounter);
					currentPoint.moveX(this.hexSize*1.5);
					currentPoint.moveY(this.calcHexShiftY(hexCounter));
					hexCounter--;
				}

			this.hexColumns.push(currentColumn);
			
		}
		
	}
	
	createColumn(columnStart, numOfHexes) {

		let point = columnStart;
		let column = [];

		for (let i = 0; i < numOfHexes; i++) {

			let currentHex = new Hex(point, this.hexSize, this.nodeRadius);
			
			currentHex.createChildNodes();
			
			column.push(currentHex);
			
			point.moveY(Math.sqrt(3)*this.hexSize);
		}
		
		return column;
		
	}
	
}
