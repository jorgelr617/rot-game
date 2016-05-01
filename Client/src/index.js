import {Map} from "./map.js"
import {Point} from "./point.js"
import * as d3 from "d3";

$(document).ready(function() {
  
	var boardWidth = window.innerWidth;
	var boardHeight = window.innerHeight;
	
  d3.select('#board')
		.attr("x", 0)
		.attr("y", 0)
		.attr("width", boardWidth)
		.attr("height", boardHeight)
		.style("background", "tan");
	
  var center = new Point(boardWidth/2, boardHeight/2);
	
	var testMap = new Map(
		50, // hex size,
    10, // node radius
		4, // the minimum number of hexes in a column
		7 // the maximum number of hexes in a column
  );

	testMap.createAllColumns(center);
	testMap.drawHexes();
	testMap.drawNodes();
    
});

