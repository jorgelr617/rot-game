import * as d3 from "d3";

export class Node {
	
  constructor(nodeIdArray) {

		this.nodeIdArray = nodeIdArray;
		this.nodeIdString = "n" + this.nodeIdArray[0] + this.nodeIdArray[1] + this.nodeIdArray[2];

		this.hexesThatItCanAffect = [];

		this.isInGame = true;
		this.ownerId = null;
		
		this.center = undefined;
		this.radius = 10;

  }

	addHexThatItCanAffect(hexIdArray) {
		this.hexesThatItCanAffect.push(hexIdArray);
	}

	setOwner(ownerId) {
		this.ownerId = ownerId;
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
				.attr("id", this.nodeIdString)
				.classed({'node': true, 'nodeNotClicked': true});
	}
	
}
