import $ from 'jquery'
import {Map} from "./map.js"
import {MapCreationAnimator} from "./mapCreationAnimator.js"
import {Hex} from "./hex.js"
import {Node} from "./node.js"
import * as d3 from 'd3'


/*
  TODO: Complete click functionality
          --> commit
          --> create new branch



*/


$(document).ready(function() {
  /*
  var container = $("<div></div>", {class: "container"});
  var canvas = $("<canvas></canvas>", {width: 1000, height: 1000});


  container.append(canvas);
  $("body").append(canvas);

  var context = canvas[0].getContext("2d");
  var elemLeft = canvas[0].offsetLeft;
  var elemTop = canvas[0].offsetTop;
  context.fillRect(0, 0, canvas.width, canvas.height);
  */

  var svg = d3.select("svg")
                .attr("width", 1000)
                .attr("height", 1000)

  var testMap = new Map(
    5, // the radius of the hex grid in hexes
    5, // node radius
    15, // hex size
    {x:450, y:350} // center
  );


  testMap.addHexesToNodes();

  // starting spots
  testMap.nodes[49].owner = 1;
  testMap.nodes[210].owner = 2;
  testMap.nodes[24].owner = 3;
  testMap.nodes[121].owner = 4;

  testMap.claim(1, 46);
  testMap.claim(1, 47);
  testMap.claim(1, 52);
  testMap.claim(1, 51);
  testMap.claim(1, 50);
  testMap.assignHexes();



  //console.log(testMap);

  //var animator = new MapCreationAnimator(testMap);
  //animator.animate(400);


  //var testNode = new Node(30, 100, 20);
  //var testHex = new Hex(100, 100, 20);
  //testHex.draw();
  //testNode.draw();




  // event handling

  //canvas[0].addEventListener("mousedown", function(evnt) {
    /*
    console.log("Client: " + [evnt.clientX, evnt.clientY]);
    console.log("Screen: " + [evnt.screenX, evnt.screenY]);
    console.log("Page: " + [evnt.pageX, evnt.pageY]);
    if(testNode.clicked(evnt.clientX, evnt.clientY)) {
      console.log("Clicked");

      context.beginPath();
      context.arc(evnt.clientX, evnt.clientY, 1, 0, 2.0 * Math.PI);
      context.closePath();
      context.fillStyle = "orange";
      context.fill();
    }
    */
    //testMap.nodeClicked(evnt.pageX - elemLeft, evnt.pageY - elemTop);
  //});

});



/*
  What needs to be tested:
  TODO: clicking on a node
  TODO: ensure that hexes are properly added to nodes

  Functions to test: (** == Done)

    **Map.addHexesToNodes()
    **Map.canClaim(player, id)
      => **Map.claim(player, id)
      => Map.countHexesControlledBy(player)

    **Node.clicked(screenX, screenY)
*/
