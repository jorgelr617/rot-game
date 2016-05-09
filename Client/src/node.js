import * as d3 from "d3";

export class Node {
	
  constructor(parentHexId, nodeId) {

		this.parentHexId = parentHexId;
		this.nodeId = nodeId;
		this.idString = this.parentHexId + " " + this.nodeId;
		this.isInGame = true;

		this.center = undefined;
		this.radius = 10;

  }

	getHexId(){
		return this.parentHexId;
	}

	setCenter(point) {
		this.center = point;
	}

	getCenter() {
		return this.center;
	}

	draw() {

			d3.select('#board')
				.append("circle")
				.attr("cx", this.center.x)
				.attr("cy", this.center.y)
				.attr("r", this.radius)
				.attr("id", this.idString)
				.classed({'node': true, 'nodeNotClicked': true});
	}
	
}
