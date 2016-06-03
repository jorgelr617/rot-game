import {GameProperties} from "./gameProperties.js"
import {Point} from "./point.js"
import * as d3 from "d3";

export class Hex {


  constructor(x, y, size) {
    //console.log("Hex " + x + ", " + y + ", " + size);
    this.degOffset = 0; // 0 is flat top, 30 is pointy top
    this.center = new Point(x, y)
    this.size = size;

    var cornerPoints = this.corners();

    console.log(cornerPoints);

    var lineFunction = d3.svg.line()
			                   .x(function (d) { return d.x; })
                    		 .y(function (d) { return d.y; })
			                   .interpolate("linear");

    this.path = d3.select('#board')
               		 .append("path")
               				.attr("d", lineFunction(cornerPoints))
                      .style("fill", this.fill())

    this.owner = 0;
    this.visited = false;

    this.label = "";

    this.labelColor = "black";
    this.stroke = "black";

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

  draw() {



  }
  */

  updateFill() {
    this.path.style("fill", this.fill())
  }



}
