"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Node = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _point = require("./point.js");

var _gameProperties = require("./gameProperties.js");

var _d = require("d3");

var d3 = _interopRequireWildcard(_d);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Node = exports.Node = function () {

  // place a node at the corner of each hex

  function Node(map, x, y, radius, id) {
    _classCallCheck(this, Node);

    this.id = id;
    this.map = map;
    this.owner = 0;
    this.center = new _point.Point(x, y);
    this.radius = radius;

    this.graphic = d3.select("#board").append("circle").attr("cx", this.center.x).attr("cy", this.center.y).attr("r", this.radius).style("fill", this.fill()).on("click", function () {
      // update the color for this node
      if (this.map.canClaim(this.map.playerTurn, this.id)) this.map.claim(this.map.playerTurn, this.id);
    });
    this.label = "";

    // used for coloring the nodes
    this.labelColor = "Black";
    this.stroke = "black";

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
  }, {
    key: "updateFill",
    value: function updateFill() {
      this.graphic.style("fill", this.fill());
    }
  }]);

  return Node;
}();