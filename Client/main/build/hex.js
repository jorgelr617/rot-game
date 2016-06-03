"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Hex = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _gameProperties = require("./gameProperties.js");

var _point = require("./point.js");

var _d = require("d3");

var d3 = _interopRequireWildcard(_d);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Hex = exports.Hex = function () {
  function Hex(x, y, size) {
    _classCallCheck(this, Hex);

    console.log("Hex " + x + ", " + y + ", " + size);
    this.degOffset = 0; // 0 is flat top, 30 is pointy top
    this.center = new _point.Point(x, y);
    this.size = size;

    var cornerPoints = this.corners();

    var lineFunction = d3.svg.line().x(function (d) {
      return d.x;
    }).y(function (d) {
      return d.y;
    }).interpolate("linear");

    this.path = d3.select('#board').append("path").attr("d", lineFunction(this.corners())).style("fill", this.fill());

    this.owner = 0;
    this.visited = false;

    this.label = "";

    this.labelColor = "black";
    this.stroke = "black";

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
      draw() {
    
      }
    */

  }, {
    key: "updateFill",
    value: function updateFill() {
      this.path.style("fill", this.fill());
    }
  }]);

  return Hex;
}();