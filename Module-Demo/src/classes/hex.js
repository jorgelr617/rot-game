import {Point} from "./point.js"
import {Node} from "./node.js"
import * as d3 from "d3";

export class Hex {
	
	constructor(hexIdArray) {

		this.hexIdArray = hexIdArray.slice(0);
		this.hexIdString = "H" + this.hexIdArray[0] + this.hexIdArray[1];
		
		this.controlNodes = [];

		this.leftChildNode = undefined;
		this.rightChildNode = undefined;
		
		this.isInGame = this.checkIfInGame();
		
		this.center = undefined;
		this.cornerPoints = [];
		
		//TODO: get this value from the Map class without using the constructor
		this.hexRadius = 50;
		
	}

	//server-side game state information

	checkIfInGame() {
		//if the hex is in the left-most column, it is not in the game.
		if (this.hexIdArray[0] === 0) {
			return false;
		//if the hex is in the right-most column, it is not in the game.
		} else if (this.hexIdArray[0] === 6) {
			return false;
			//finally, if the hex is not the top hex in the column, the hex is in the game.
		} else return this.hexIdArray[1] !== 0;
	}

	createChildNodes() {

		let nodeIdArray = this.hexIdArray.slice(0);
		nodeIdArray.push("R");
		this.rightChildNode = new Node(nodeIdArray.slice(0));

		nodeIdArray.splice(2, 1, "L");
		this.leftChildNode = new Node(nodeIdArray.slice(0));
		
		if(this.hexIdArray[0] === 0)	{
			this.leftChildNode.isInGame = false;
		}
		
		if(this.hexIdArray[0] === 6) {
			this.rightChildNode.isInGame = false;
		}
		
	};
	
	setControlNodes(arrayOfNodes) {
		this.controlNodes = arrayOfNodes;
	}
	
	//client-side positioning and rendering

	setCenter(point) {
		this.center = point;
	}

	getCenter() {
		return this.center;
	}

  calcCorner(i) {
    var degrees = 60 * i;
    var radians = Math.PI / 180 * degrees;
    return new Point(this.center.x + this.hexRadius * Math.cos(radians),
			               this.center.y + this.hexRadius * Math.sin(radians));
  }

  setCorners() {
    for(var i = 0; i < 7; i++) {
      this.cornerPoints.push(this.calcCorner(i));
    }
  }

	getCorner(i) {
		return this.cornerPoints[i];
	}

	positionChildNodes() {

		let cornerPoint1 = this.calcCorner(1);
		this.rightChildNode.setCenter(cornerPoint1);

		let cornerPoint2 = this.calcCorner(2);
		this.leftChildNode.setCenter(cornerPoint2);

	}
  
  draw() {

		var lineFunction = d3.svg.line()
			.x(function (d) {
				return d.x;
			})
			.y(function (d) {
				return d.y;
			})
			.interpolate("linear");

		d3.select('#board')
			.append("path")
				.attr("id", this.hexIdString)
				.attr("d", lineFunction(this.cornerPoints))
				.classed({'hex': true, 'hexNotClicked': true});
	}
	
}
