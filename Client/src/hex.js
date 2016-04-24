
import {GameProperties} from "./gameProperties.js"
import {Point} from "./point.js"
import {Node} from "./node.js"

export class Hex {

	constructor(ctx, center, size, nodeRadius) {

		this.owner = 0;
		this.visited = false;

		this.ctx = ctx;
		this.label = "";

		this.labelColor = "black";
		this.stroke = "black";

		this.degOffset = 0; // 0 is flat top, 30 is pointy top
		this.center = center;
		this.size = size;
		
		this.nodeRadius = nodeRadius;
		this.leftChildNode = undefined;
		this.rightChildNode = undefined;

	}

	createChildNodes() {

		var center0 = this.corner(1);
		this.rightChildNode = new Node(this.ctx, center0.x, center0.y, this.nodeRadius);

		var center1 = this.corner(2);
		this.leftChildNode = new Node(this.ctx, center1.x, center1.y, this.nodeRadius);

	};

  /*
    Gets the position of the ith corner of the hexagon.
  */
  corner(i) {
    var degrees = 60 * i + this.degOffset;
    var radians = Math.PI / 180 * degrees;
    return new Point(this.center.x + this.size * Math.cos(radians),
			               this.center.y + this.size * Math.sin(radians));
  }

  /*
    Gets all the corners of the hexagon.
  */
  corners() {
    var cornerPoints = [];
    for(var i = 0; i < 6; i++) {
      cornerPoints.push(this.corner(i));
    }
    return cornerPoints;
  }


  /*
    Draws the hex to the current context
  */
  draw() {
    var cornerPoints = this.corners();

    // draw the hex
    this.ctx.beginPath();
    this.ctx.moveTo(cornerPoints[0].x, cornerPoints[0].y);
    for(var i = 1; i < 6; i++) {
      this.ctx.lineTo(cornerPoints[i].x, cornerPoints[i].y);
    }
    this.ctx.closePath();

    this.ctx.strokeStyle = this.stroke;
    this.ctx.fillStyle = this.fill();
    this.ctx.stroke();
    this.ctx.fill();

    // add the label
    this.ctx.textAlign = "center";
    this.ctx.font = "15px Arial";
    this.ctx.fillStyle = this.labelColor;
    this.ctx.fillText(this.label, this.center.x, this.center.y);
		
		this.leftChildNode.draw();
		this.rightChildNode.draw();
  }

    /*
     Determines the color of the given hex.
     */
    fill() {
        return GameProperties.teamColors[this.owner];
    }



}
