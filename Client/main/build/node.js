"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Node = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _point = require("./point.js");

var _gameProperties = require("./gameProperties.js");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Node = exports.Node = function () {

  // place a node at the corner of each hex

  function Node(context, x, y, radius) {
    _classCallCheck(this, Node);

    this.owner = 0;

    this.context = context;
    this.label = "";

    // used for coloring the nodes
    this.labelColor = "Black";
    this.stroke = "black";

    this.center = new _point.Point(x, y);
    this.radius = radius;

    // the corrindates of each connected hex
    this.connectedHexes = []; // should be about 3
  }

  /*
    Determines the color of the given hex.
  */


  _createClass(Node, [{
    key: "fill",
    value: function fill() {
      return _gameProperties.GameProperties.teamColors[this.owner];
    }

    /*
      Determines if a given node has been clicked
    */

  }, {
    key: "clicked",
    value: function clicked(screenX, screenY) {
      if (this.center.distance(new _point.Point(screenX, screenY)) <= this.radius) {
        return true;
      } else {
        return false;
      }
    }
  }, {
    key: "draw",
    value: function draw() {
      this.context.beginPath();
      this.context.arc(this.center.x, this.center.y, this.radius, 0, 2.0 * Math.PI);
      this.context.closePath();
      this.context.fillStyle = this.fill();
      this.context.strokeStyle = this.stroke;
      this.context.fill();
      this.context.stroke();

      // add the label
      this.context.textAlign = "center";
      this.context.font = "10px Arial";
      this.context.fillStyle = this.labelColor;
      this.context.fillText(this.label, this.center.x, this.center.y);
    }
  }]);

  return Node;
}();