import {Point} from "./point.js"
import {GameProperties} from "./gameProperties.js"
import * as d3 from 'd3'

export class Node {

  // place a node at the corner of each hex
  constructor(map, x, y, radius, id) {
    var self = this;

    //console.log("Node " + x + ", " + y + ", " + radius);
    this.id = id;
    this.map = map;
    this.owner = 0;
    this.center = new Point(x, y);
    this.radius = radius;

    this.graphic = d3.select("#board")
                     .append("circle")
                        .attr("cx", this.center.x)
                        .attr("cy", this.center.y)
                        .attr("r", this.radius)
                        .attr("stroke", "black")
                        .style("fill", this.fill())
                        .on("click", function() {
                          // update the color for this node
                          console.log("Attempting to claim");
                          if(self.map.canClaim(self.map.playerTurn, self.id))
                            self.map.claim(self.map.playerTurn, self.id);

                        })
    this.label = "";

    // used for coloring the nodes
    this.labelColor = "Black";

    // the corrindates of each connected hex
    this.connectedHexes = []; // should be about 3
  }

  /*
    Determines the color of the given hex.
  */
  fill() {
    return GameProperties.teamColors[this.owner];
  }


  updateFill() {
    this.graphic.style("fill", this.fill())
  }




}
