
import {GameProperties} from "./gameProperties.js"
import {Point} from "./point.js"
import {Node} from "./node.js"
import * as d3 from "d3";

export class Hex {

	constructor(center, size, nodeRadius) {

		this.owner = 0;
		this.visited = false;
		
		this.label = "";

		this.labelColor = "black";
		this.stroke = "black";

		this.degOffset = 0; // 0 is flat top, 30 is pointy top
		this.center = center;
		this.cornerPoints = [];
		this.size = size;
		
		this.nodeRadius = nodeRadius;
		this.leftChildNode = undefined;
		this.rightChildNode = undefined;

		this.setCorners();

	}

	createChildNodes() {

		var center0 = this.getCorner(1);
		this.rightChildNode = new Node(center0.x, center0.y, this.nodeRadius);

		var center1 = this.getCorner(2);
		this.leftChildNode = new Node(center1.x, center1.y, this.nodeRadius);

	};

  /*
    calculate the position of the ith corner of the hexagon.
  */
  calcCorner(i) {
    var degrees = 60 * i + this.degOffset;
    var radians = Math.PI / 180 * degrees;
    return new Point(this.center.x + this.size * Math.cos(radians),
			               this.center.y + this.size * Math.sin(radians));
  }

  /*
    sets all the corners of the hexagon.
  */
  setCorners() {
    for(var i = 0; i < 6; i++) {
      this.cornerPoints.push(this.calcCorner(i));
    }
  }

	//get the point for the ith corder
	getCorner(i) {
		return this.cornerPoints[i];
	}


  
  //  Draws the hex to the current context
  
  draw() {

		var lineFunction = d3.svg.line()
												.x(function(d) { return d.x; })
												.y(function(d) { return d.y; })
												.interpolate("linear");

			d3.select('#board')
				.append("path")
				.attr("d", lineFunction(this.cornerPoints))
				.style("stroke", "black");
		
		};


		// var line = d3.svg.line()
    // this.ctx.beginPath();
    // this.ctx.moveTo(cornerPoints[0].x, cornerPoints[0].y);
    // for(var i = 1; i < 6; i++) {
    //   this.ctx.lineTo(cornerPoints[i].x, cornerPoints[i].y);
    // }
    // this.ctx.closePath();
		//
    // this.ctx.strokeStyle = this.stroke;
    // this.ctx.fillStyle = this.fill();
    // this.ctx.stroke();
    // this.ctx.fill();
		//
    // // add the label
    // this.ctx.textAlign = "center";
    // this.ctx.font = "15px Arial";
    // this.ctx.fillStyle = this.labelColor;
    // this.ctx.fillText(this.label, this.center.x, this.center.y);

	


    /*
     Determines the color of the given hex.
     
    fill() {
        return GameProperties.teamColors[this.owner];
    }
		 */


}
