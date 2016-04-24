import $ from 'jquery'
import {Map} from "./map.js"
import {Point} from "./point.js"
import {MapCreationAnimator} from "./mapCreationAnimator.js"
import {Hex} from "./hex.js"
import {Node} from "./node.js"


$(document).ready(function() {
  
  var canvas = document.createElement("canvas");
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  document.body.appendChild(canvas);
  var context = canvas.getContext("2d");
	context.fillStyle = "white";
  context.fillRect(0, 0, canvas.width, canvas.height);
  
  var startPoint = new Point(canvas.width/4, canvas.height/8);
//comment
	
	var testMap = new Map(
    context,
		canvas.width/22, // hex size,
    8, // node radius
		5, // the minimum number of hexes in a column
		7, // the maximum number of hexes in a column
    startPoint
  );
  
  testMap.createColumn(startPoint);
    
});

