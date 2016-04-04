"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/*
  A "circular" hex grid.


  TODO:
*/

var Map = exports.Map = function () {

  /*
    Radius: radius of the grid
    centerHex: the Hex in the center of the grid
  */

  function Map(context, radius, hexSize) {
    _classCallCheck(this, Map);

    this.hexes = [];

    for (var i = 0; i < radius * 2 + 1; i++) {
      this.hexes.push([]);
      for (var j = 0; j < radius * 2 + 1; j++) {
        var r = i - radius;
        var q = j - radius - Math.min(0, r);
        var screenCoord = this.hexToPixelFlat(r, q, hexSize);
        this.hexes[i].push(new Hex(context, screenCoord.x, screenCoord.y, hexSize));
      }
    }

    // build the hex grid
  }

  _createClass(Map, [{
    key: "draw",
    value: function draw() {
      for (var i = 0; i < radius * 2 + 1; i++) {
        for (var j = 0; j < radius * 2 + 1; j++) {
          this.hexes[i][j].draw();
        }
      }
    }

    /*
      Gets the hex at the axial coordinate.
    */

  }, {
    key: "getAtAxial",
    value: function getAtAxial() {}

    /*
      */

  }, {
    key: "getAtCubical",
    value: function getAtCubical() {}
  }, {
    key: "hexToPixelPointy",
    value: function hexToPixelPointy(q, r, size) {
      var x = size * Math.sqrt(3) * (q + r / 2);
      var y = size * (3 / 2) * r;
      return {
        x: x,
        y: y
      };
    }
  }, {
    key: "hexToPixelFlat",
    value: function hexToPixelFlat(q, r, size) {
      var x = size * (3 / 2) * q;
      var y = size * Math.sqrt(3) * (r + q / 2);
      return {
        x: x,
        y: y
      };
    }
  }]);

  return Map;
}();