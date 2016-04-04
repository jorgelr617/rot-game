import {Point} from "./point.js"
import {GameProperties} from "./gameProperties.js"

export class Node {

  // place a node at the corner of each hex
  constructor(context, x, y, radius) {
    this.owner = 0;

    this.context = context;
    this.label = "";

    // used for coloring the nodes
    this.labelColor = "Black";
    this.stroke = "black";

    this.center = new Point(x, y);
    this.radius = radius;

    // the corrindates of each connected hex
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
    if(this.center.distance(new Point(screenX, screenY)) <= this.radius) {
      return true;
    } else {
      return false;
    }
  }


  draw() {
    this.context.beginPath()
    this.context.arc(this.center.x, this.center.y, this.radius, 0, 2.0 * Math.PI);
    this.context.closePath();
    this.context.fillStyle = this.fill();
    this.context.strokeStyle = this.stroke;
    this.context.fill();
    this.context.stroke();

    // add the label
    this.context.textAlign = "center"
    this.context.font = "10px Arial"
    this.context.fillStyle = this.labelColor
    this.context.fillText(this.label, this.center.x, this.center.y)
  }




}
