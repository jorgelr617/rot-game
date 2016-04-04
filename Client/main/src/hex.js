
import {GameProperties} from "./gameProperties.js"
import {Point} from "./point.js"

export class Hex {


  constructor(context, x, y, size) {

    this.owner = 0;
    this.visited = false;

    this.context = context;
    this.label = "";

    this.labelColor = "black";
    this.stroke = "black";

    this.degOffset = 0; // 0 is flat top, 30 is pointy top
    this.center = new Point(x, y)
    this.size = size;

    this.nodeIds = [];
    for(var i = 0; i < 6; i++) {
      this.nodeIds.push(-1);
    }
  }

  /*
    Determines the color of the given hex.
  */
  fill() {
    return GameProperties.teamColors[this.owner];
  }

  /*
    Sets the id of the node at the given index
  */
  setNodeId(id, index) {
    this.nodeIds[index] = id;
  }

  /*
    Gets the id of the node at the given index
  */
  getNodeId(index) {
    return this.nodeIds[index];
  }


  /*
    Gets the position of the ith corner of the hexagon.
  */
  corner(i) {
    var degrees = 60 * i + this.degOffset;
    var radians = Math.PI / 180 * degrees;
    return {
      x: this.center.x + this.size * Math.cos(radians),
      y: this.center.y + this.size * Math.sin(radians)
    }
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
    this.context.beginPath()
    this.context.moveTo(cornerPoints[0].x, cornerPoints[0].y);
    for(var i = 1; i < 6; i++) {
      this.context.lineTo(cornerPoints[i].x, cornerPoints[i].y);
    }
    this.context.closePath()

    this.context.strokeStyle = this.stroke;
    this.context.fillStyle = this.fill();
    this.context.stroke()
    this.context.fill()

    // add the label
    this.context.textAlign = "center"
    this.context.font = "15px Arial"
    this.context.fillStyle = this.labelColor
    this.context.fillText(this.label, this.center.x, this.center.y)
  }
}
