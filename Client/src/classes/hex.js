import {Point} from "./point.js"
import * as d3 from "d3";

export class Hex {
	
	constructor(hexIdArray) {

		this.hexIdArray = hexIdArray.slice(0);
		this.hexIdString = "H" + this.hexIdArray[0] + this.hexIdArray[1];
		
		this.center = null;
		this.cornerPoints = [];
		
		//TODO: get this value from the Map class without using the constructor
		this.hexRadius = 50;
		
	}

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
