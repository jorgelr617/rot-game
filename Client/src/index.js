import {Map} from "./map.js"
import {Point} from "./classes/point.js"
import * as GameMap from "../game-map";
import * as d3 from "d3";

$(document).ready(function() {
  
	//the board will not span the entire window in the finished version
	let boardWidth = $(window).width() - 25;
	let boardHeight = $(window).height() - 25;

	//TODO: figure out where to place starting point so that board is always centered in html element that contains it
	let startPoint = new Point(boardWidth/4, boardHeight/3);
	
  d3.select('#board')
		.attr('x', 0)
		.attr('y', 0)
		.attr('width', boardWidth)
		.attr('height', boardHeight)
		.style('background', 'tan');

	let clientMap = new Map(GameMap.getNodes(), GameMap.getHexes(), GameMap.getPlayers());
	
	clientMap.positionElements(startPoint);

	clientMap.renderElements();

	console.log(clientMap.nodes);
	console.log(clientMap.hexes);

	addClickListeners();

	function addClickListeners() {
		$('.hex').on('click', function(event) {
			console.log("You clicked " + event.target.id);
			hexToggleClickClass(event);
		});

		$('.node').on('click', function(event) {
			console.log("You clicked " + event.target.id);
			nodeToggleClickClass(event);
		});

	}

	function hexToggleClickClass() {
		let $hex = $(event.target);
		if ($hex.hasClass('hexNotClicked')) {
			$hex.removeClass('hexNotClicked').addClass('hexClicked');
		} else {
			$hex.removeClass('hexClicked').addClass('hexNotClicked');
		}
	}
	
	function nodeToggleClickClass() {
		let $node = $(event.target);
		if($node.hasClass('nodeNotClicked')){
			$node.removeClass('nodeNotClicked').addClass('nodeClicked');
		} else {
			$node.removeClass('nodeClicked').addClass('nodeNotClicked');
		}
	}
	
});

