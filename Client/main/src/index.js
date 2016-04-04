import $ from 'jquery'
import {Map} from "./map.js"
import {MapCreationAnimator} from "./mapCreationAnimator.js"
import {Hex} from "./hex.js"
import {Node} from "./node.js"


/*
  TODO: Complete click functionality
          --> commit
          --> create new branch
*/


$(document).ready(function() {
  var container = document.createElement("div")
  //container.addClass("container");

  var canvas = document.createElement("canvas");
  canvas.width = 1000;
  canvas.height = 1000;

  //container.appendChild(canvas);
  document.body.appendChild(canvas);

  var context = canvas.getContext("2d");
  context.fillRect(0, 0, canvas.width, canvas.height);


  var testMap = new Map(
    context,
    5, // the radius of the hex grid in hexes
    10, // node radius
    30, // hex size
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

  testMap.draw();


  //console.log(testMap);

  //var animator = new MapCreationAnimator(testMap);
  //animator.animate(400);


  //var testNode = new Node(context, 30, 100, 20);
  //var testHex = new Hex(context, 100, 100, 20);
  //testHex.draw();
  //testNode.draw();



  // event handling
  canvas.addEventListener("mousedown", function(evnt) {
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
    testMap.nodeClicked(evnt.pageX, evnt.pageY);
  });
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
