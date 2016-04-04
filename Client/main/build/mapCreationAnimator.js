"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var MapCreationAnimator = exports.MapCreationAnimator = function () {
  function MapCreationAnimator(map) {
    _classCallCheck(this, MapCreationAnimator);

    this.map = map;
    this.iteration = 0;
    this.stage = 0; // 0: Setup the hex grid
    // 1: Setup the nodes around the grid
    this.intervalId = 0;
  }

  /*
    Plays the full animation
  */


  _createClass(MapCreationAnimator, [{
    key: "animate",
    value: function animate(interval) {
      var self = this;
      this.intervalId = setInterval(function () {
        console.log(self.stage);
        self.frame(self);
      }, interval);
    }

    /*
      Plays a single frame of the animation
    */

  }, {
    key: "frame",
    value: function frame(self) {

      if (self.stage == 0) {
        // setup the hexes

        if (self.iteration < self.map.hexOrdering.length) {
          var hexLoc = self.map.hexOrdering[self.iteration];
          self.map.get(hexLoc.q, hexLoc.r).draw();
          self.iteration += 1;
        } else {
          self.iteration = 0;
          self.stage = 1;
        }
      } else if (self.stage == 1) {
        if (self.iteration < self.map.nodes.length) {
          self.map.nodes[self.iteration].draw();
          self.iteration += 1;
        } else {
          self.iteration = 0;
          self.stage = 2;
        }
      } else {
        clearInterval(self.intervalId);
      }
    }
  }]);

  return MapCreationAnimator;
}();