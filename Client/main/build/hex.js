"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Hex = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _gameProperties = require("./gameProperties.js");

var _point = require("./point.js");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Hex = exports.Hex = function () {
  function Hex(context, x, y, size) {
    _classCallCheck(this, Hex);

    this.owner = 0;
    this.visited = false;

    this.context = context;
    this.label = "";

    this.labelColor = "black";
    this.stroke = "black";

    this.degOffset = 0; // 0 is flat top, 30 is pointy top
    this.center = new _point.Point(x, y);
    this.size = size;

    this.nodeIds = [];
    for (var i = 0; i < 6; i++) {
      this.nodeIds.push(-1);
    }
  }

  /*
    Determines the color of the given hex.
  */


  _createClass(Hex, [{
    key: "fill",
    value: function fill() {
      return _gameProperties.GameProperties.teamColors[this.owner];
    }

    /*
      Sets the id of the node at the given index
    */

  }, {
    key: "setNodeId",
    value: function setNodeId(id, index) {
      this.nodeIds[index] = id;
    }

    /*
      Gets the id of the node at the given index
    */

  }, {
    key: "getNodeId",
    value: function getNodeId(index) {
      return this.nodeIds[index];
    }

    /*
      Gets the position of the ith corner of the hexagon.
    */

  }, {
    key: "corner",
    value: function corner(i) {
      var degrees = 60 * i + this.degOffset;
      var radians = Math.PI / 180 * degrees;
      return {
        x: this.center.x + this.size * Math.cos(radians),
        y: this.center.y + this.size * Math.sin(radians)
      };
    }

    /*
      Gets all the corners of the hexagon.
    */

  }, {
    key: "corners",
    value: function corners() {
      var cornerPoints = [];
      for (var i = 0; i < 6; i++) {
        cornerPoints.push(this.corner(i));
      }
      return cornerPoints;
    }

    /*
      Draws the hex to the current context
    */

  }, {
    key: "draw",
    value: function draw() {
      var cornerPoints = this.corners();

      // draw the hex
      this.context.beginPath();
      this.context.moveTo(cornerPoints[0].x, cornerPoints[0].y);
      for (var i = 1; i < 6; i++) {
        this.context.lineTo(cornerPoints[i].x, cornerPoints[i].y);
      }
      this.context.closePath();

      this.context.strokeStyle = this.stroke;
      this.context.fillStyle = this.fill();
      this.context.stroke();
      this.context.fill();

      // add the label
      this.context.textAlign = "center";
      this.context.font = "15px Arial";
      this.context.fillStyle = this.labelColor;
      this.context.fillText(this.label, this.center.x, this.center.y);
    }
  }]);

  return Hex;
}();