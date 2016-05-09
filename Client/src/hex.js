import {Point} from "./point.js"
import {Node} from "./node.js"
import * as d3 from "d3";

export class Hex {
	
	constructor(hexId) {

		this.hexId = hexId;
		this.isInGame = this.checkIfInGame();
		this.leftChildNode = undefined;
		this.rightChildNode = undefined;

		this.center = undefined;
		this.hexRadius = 50;
		this.cornerPoints = [];
	}
	
	//assign game attributes to hex
	
	//refactor
	checkIfInGame() {
		if (this.hexId.col === 0) {
			return false;
		} else if (this.hexId.col === 6) {
			return false;
		} else if (this.hexId.row === 0) {
			return false;
		} else {
			return true;
		}
	}

	createChildNodes() {

		this.rightChildNode = new Node(this.getIdString(), "right");

		this.leftChildNode = new Node(this.getIdString(), "left");
		
		if(this.hexId.col === 0)	{
			this.isInGame = false;
			this.leftChildNode.isInGame = false;
		}
		
		if(this.hexId.col === 6) {
			this.isInGame = false;
			this.rightChildNode.isInGame = false;
		}
		
	};

	getIdString() {
		return "h" + this.hexId.col + this.hexId.row;
	}

	//calculate positioning

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
    for(var i = 0; i < 6; i++) {
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
	
	//render hex
  
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
				.attr("id", this.getIdString())
				.attr("d", lineFunction(this.cornerPoints))
				.classed({'hex': true, 'hexNotClicked': true});
	}
	
}
