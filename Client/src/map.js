import {Hex} from "./classes/hex.js"

export class Map {

  constructor() {
		
		this.hexColumns = [];
		this.gameNodes = [];
		
		this.minGameHexes = 3;
		this.maxGameHexes = 5;
		this.numberOfGameColumns = 2*(this.maxGameHexes - this.minGameHexes) + 1;
		this.numberOfColumns = this.numberOfGameColumns + 2;
		
		//find out how to set these parameters where they can be accessed from anywhere
		this.hexRadius = 50;
	}

	//create data structure
	
	createAllColumns() {
		
		let currentColumn = [];
		let numOfHexesInColumn = this.minGameHexes;

		for (let colId = 0; colId < this.numberOfColumns; colId++) {
			
			if (colId < Math.floor(this.numberOfColumns/2)) {

				currentColumn = this.createColumn(numOfHexesInColumn, colId);
				numOfHexesInColumn++;

			} else {

				currentColumn = this.createColumn(numOfHexesInColumn, colId);
				numOfHexesInColumn--;
		
			}

			this.hexColumns.push(currentColumn);

		}

	}

	createColumn(numOfHexes, colId) {

		this.colId = colId;
		let column = [];

		for (let rowCounter = 0; rowCounter < numOfHexes; rowCounter++) {

			let hexIdArray = [];
			hexIdArray.push(this.colId);
			hexIdArray.push(rowCounter);
			
			let currentHex = new Hex(hexIdArray);
			
			currentHex.createChildNodes();

			column.push(currentHex);

			if(currentHex.leftChildNode.isInGame === true) {
				this.gameNodes.push(currentHex.leftChildNode);
			}
			if(currentHex.rightChildNode.isInGame === true) {
				this.gameNodes.push(currentHex.rightChildNode);
			}
			
		}
		return column;
	}

	//add node and hex mutual dependencies
	

	
	//position elements
	
	positionHexes(startPoint) {

		let point = startPoint;
		let currentColumn = undefined;
		let currentHex = undefined;

		for (let colCounter = 0; colCounter < this.hexColumns.length; colCounter++) {

			currentColumn = this.hexColumns[colCounter];

			for (let rowCounter = 0; rowCounter < currentColumn.length; rowCounter++) {

				currentHex = currentColumn[rowCounter];
				currentHex.setCenter(point);
				currentHex.setCorners();
				currentHex.positionChildNodes();
				point.moveY(Math.sqrt(3) * this.hexRadius);

			}
			
			if (colCounter < Math.floor(this.numberOfColumns/2)) {
				point.moveY(this.calcNextColumnTopHexY(currentColumn.length + 1));
			} else {
				point.moveY(this.calcNextColumnTopHexY(currentColumn.length));
			}
			point.moveX(this.hexRadius*1.5);
		}
		
	}
	
	calcNextColumnTopHexY(hexCounter) {
		return (-1*Math.sqrt(3) * this.hexRadius * hexCounter)+ Math.sqrt(3)/2*this.hexRadius;
	};

	//render elements
	
	drawGameHexes() {
		this.hexColumns.forEach(function (column) {
			column.forEach(function (hex) {
				if (hex.isInGame === true) { hex.draw(); }
			});
		});
	}
	
	drawGameNodes() {
		this.gameNodes.forEach(function(node){
			node.draw();
		})
	}
	
	drawAllHexes() {
		this.hexColumns.forEach(function (column) {
			column.forEach(function(hex){
				hex.draw();
			});
		});
	}

	drawAllNodes() {
		this.hexColumns.forEach(function (column) {
			column.forEach(function(hex){
				hex.leftChildNode.draw();
				hex.rightChildNode.draw();
			});
		});
	}


}
