import {Map} from "./map.js"
import {Point} from "./classes/point.js"
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
	//
	var testMap = new Map();

	testMap.createGameState();

	testMap.assignControlNodes();

	testMap.assignNodeNeighbors();
	
	testMap.positionElements(startPoint);

	testMap.renderElements();

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
		if($hex.hasClass('hexNotClicked')){
			$hex.removeClass('hexNotClicked').addClass('hexClicked');
		} else {
			$hex.removeClass('hexClicked').addClass('hexNotClicked');
		}
		
		let hexIdArray = convertHexIdStringtoArray($hex[0].id);
		let hex = testMap.clientHexes[hexIdArray];

		for (let nodeId in hex.controlNodes) {
			let $node = $("#n" + hex.controlNodes[nodeId].join(''));
			if($node.hasClass('nodeNotClicked')){
				$node.removeClass('nodeNotClicked').addClass('nodeClicked');
			} else {
				$node.removeClass('nodeClicked').addClass('nodeNotClicked');
			}
		}
	}

	// function nodeToggleClickClass() {
	// 	let $node = $(event.target);
	// 	if($node.hasClass('nodeNotClicked')){
	// 		$node.removeClass('nodeNotClicked').addClass('nodeClicked');
	// 	} else {
	// 		$node.removeClass('nodeClicked').addClass('nodeNotClicked');
	// 	}
	//
	// 	let nodeIdArray = convertNodeIdStringtoArray($node[0].id);
	// 	let node = testMap.clientNodes[nodeIdArray];
	//
	// 	for (let hexId in node.hexesThatItCanAffect) {
	// 		let $hex = $("#H" + node.hexesThatItCanAffect[hexId].join(''));
	// 		if($hex.hasClass('hexNotClicked')){
	// 			$hex.removeClass('hexNotClicked').addClass('hexClicked');
	// 		} else {
	// 			$hex.removeClass('hexClicked').addClass('hexNotClicked');
	// 		}
	// 	}
	//
	// }

	function nodeToggleClickClass() {
		let $node = $(event.target);
		if($node.hasClass('nodeNotClicked')){
			$node.removeClass('nodeNotClicked').addClass('nodeClicked');
		} else {
			$node.removeClass('nodeClicked').addClass('nodeNotClicked');
		}

		let nodeIdArray = convertNodeIdStringtoArray($node[0].id);
		let node = testMap.clientNodes[nodeIdArray];

		node.neighborsIdArray.forEach(function(idArray) {
			let $neighbor = $("#n" + idArray.join(''));
			if($neighbor.hasClass('nodeNotClicked')){
				$neighbor.removeClass('nodeNotClicked').addClass('nodeClicked');
			} else {
				$neighbor.removeClass('nodeClicked').addClass('nodeNotClicked');
			}
		})

	}

	function convertHexIdStringtoArray(hexIdString) {
		let arrayToReturn = [];
		arrayToReturn.push(Number(hexIdString.charAt(1)));
		arrayToReturn.push(Number(hexIdString.charAt(2)));
		return arrayToReturn;
	}

	function convertNodeIdStringtoArray(nodeIdString) {
		let arrayToReturn = [];
		arrayToReturn.push(Number(nodeIdString.charAt(1)));
		arrayToReturn.push(Number(nodeIdString.charAt(2)));
		arrayToReturn.push(nodeIdString.charAt(3));
		return arrayToReturn;
	}



	
});

