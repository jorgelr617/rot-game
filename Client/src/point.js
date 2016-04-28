export class Point {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

	moveX(dist) {
		this.x += dist;
	}
	
	moveY(dist) {
		this.y += dist;
	}
	
  distance(refPoint) {
    return Math.sqrt(Math.pow(this.x - refPoint.x, 2) + Math.pow(this.y - refPoint.y, 2));
  }
	
}
