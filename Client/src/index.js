import {Map} from "./map.js"
import {Point} from "./point.js"
import * as d3 from "d3";

$(document).ready(function() {
  
	let boardWidth = window.innerWidth;
	let boardHeight = window.innerHeight;
	let startPoint = new Point(boardWidth/4, boardHeight/3);
	
  d3.select('#board')
		.attr("x", 0)
		.attr("y", 0)
		.attr("width", boardWidth)
		.attr("height", boardHeight)
		.style("background", "tan");
	
	var testMap = new Map();

	testMap.createAllColumns();
	
	testMap.positionHexes(startPoint);

	testMap.drawGameHexes();
	
	testMap.drawGameNodes();
    
});

