import $ from 'jquery'
import {Map} from "./map.js"
import {Point} from "./point.js"
import {MapCreationAnimator} from "./mapCreationAnimator.js"
import {Hex} from "./hex.js"
import {Node} from "./node.js"
import * as d3 from "d3";

$(document).ready(function() {
  
	var boardWidth = window.innerWidth;
	var boardHeight = window.innerHeight;
	
  d3.selectAll('.board')
		.attr("x", 0)
		.attr("y", 0)
		.attr("width", boardWidth)
		.attr("height", boardHeight)
		.attr("fill", "tan");
	
  var startPoint = new Point(boardWidth/8, boardHeight/8);
	
	var testMap = new Map(
		40, // hex size,
    10, // node radius
		5, // the minimum number of hexes in a column
		7 // the maximum number of hexes in a column
  );
  
  testMap.createColumn(startPoint);
    
});

