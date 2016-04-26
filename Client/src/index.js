import $ from 'jquery'
import {Map} from "./map.js"
import {Point} from "./point.js"
import {MapCreationAnimator} from "./mapCreationAnimator.js"
import {Hex} from "./hex.js"
import {Node} from "./node.js"
import * as d3 from "d3";

$(document).ready(function() {
  
  d3.select('.container').text('selected');
  // board.width = window.innerWidth;
  // board.height = window.innerHeight;

	// d3.select("div")
	// 	.append('svg')
	// 	.attr('width', 600)
	// 	.attr('height', 600);
	//comment
	
  // document.body.appendChild(board);
  // var context = board.getContext("2d");
	// context.fillStyle = "white";
  // context.fillRect(0, 0, board.width, board.height);
  //
  // var startPoint = new Point(board.width/4, board.height/8);
	//
	// var testMap = new Map(
  //   context,
		// board.width/22, // hex size,
  //   8, // node radius
		// 5, // the minimum number of hexes in a column
		// 7, // the maximum number of hexes in a column
  //   startPoint
  // );
  //
  // testMap.createColumn(startPoint);
    
});

