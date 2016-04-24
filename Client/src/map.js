import {Hex} from "./hex.js"
import {Node} from "./node.js"
import {GameProperties} from "./gameProperties.js"

export class Map {

  constructor(ctx, hexSize, nodeRadius, minHexes, maxHexes, mapStartPoint) {

		this.ctx = ctx;

		this.hexColumn = [];
		this.nodes = {};

		this.hexSize = hexSize;
		this.nodeRadius = nodeRadius;
		this.minHexes = minHexes;
		this.maxHexes = maxHexes;

		this.mapStartPoint = mapStartPoint;

	}

	createColumn(startPoint) {

		var point = startPoint;

		for (let i = 0; i < this.minHexes; i++) {

			var currentHex = new Hex(this.ctx, point, this.hexSize, this.nodeRadius);
			
			currentHex.createChildNodes();
			
			this.hexColumn.push(currentHex);
			
			point.shiftDown(this.hexSize);
		}

		this.hexColumn.forEach(function(hex) {
			hex.draw();
		})

	}




}
