import {Point} from "./point.js"
import {GameProperties} from "./gameProperties.js"

export class Node {

  // place a node at the corner of each hex
  constructor(ctx, x, y, radius) {
    this.owner = 0;

    this.ctx = ctx;
		
    this.label = "";

    // used for coloring the nodes
    this.labelColor = "Black";
    this.stroke = "black";

    this.center = new Point(x, y);
    this.radius = radius;

    // the coordinates of each connected hex
    this.connectedHexes = []; // should be about 3
  }

  /*
    Determines the color of the given hex.
  */
  fill() {
    return GameProperties.teamColors[this.owner];
  }

  /*
    Determines if a given node has been clicked
  */
  clicked(screenX, screenY) {
    return this.center.distance(new Point(screenX, screenY)) <= this.radius;
  }


  draw() {
    this.ctx.beginPath();
    this.ctx.arc(this.center.x, this.center.y, this.radius, 0, 2.0 * Math.PI);
    this.ctx.closePath();
    this.ctx.fillStyle = this.fill();
    this.ctx.strokeStyle = this.stroke;
    this.ctx.fill();
    this.ctx.stroke();

    // add the label
    this.ctx.textAlign = "center";
    this.ctx.font = "10px Arial";
    this.ctx.fillStyle = this.labelColor;
    this.ctx.fillText(this.label, this.center.x, this.center.y)
  }




}