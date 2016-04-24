


export class MapCreationAnimator {
  constructor(map) {
    this.map = map;
    this.iteration = 0;
    this.stage = 0; // 0: Setup the hex grid
                    // 1: Setup the nodes around the grid
    this.intervalId = 0;
  }


  /*
    Plays the full animation
  */
  animate(interval) {
    var self = this;
    this.intervalId = setInterval(function() {
      console.log(self.stage);
      self.frame(self);
    }, interval);
  }

  /*
    Plays a single frame of the animation
  */
  frame(self) {

    if(self.stage == 0) { // setup the hexes

      if(self.iteration < self.map.hexOrdering.length) {
        var hexLoc = self.map.hexOrdering[self.iteration];
        self.map.get(hexLoc.q, hexLoc.r).draw();
        self.iteration += 1;
      } else {
        self.iteration = 0;
        self.stage = 1;
      }
    } else if(self.stage == 1) {
      if(self.iteration < self.map.nodes.length) {
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
}
