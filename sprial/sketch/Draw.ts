class Draw {
  p: p5;
  points: Array<p5.Vector> = [];
  radius: number = 0;
  theta: number = 0;

  constructor(p: p5) {
    this.p = p;
  }

  setup() {
    const p = this.p;
    p.background(100);
    // p.frameRate(20);
  }

  draw() {
    const p = this.p;
    const point = p.createVector( Math.sin(this.theta) * this.radius, Math.cos(this.theta) * this.radius);
    p.translate(p.width / 2, p.height / 2);

    this.points.push(point);

    p.strokeWeight(10);

    p.colorMode(p.HSL);


    for(let i = 0; i < this.points.length; i++) {
      const p1 = this.points[i];
      const p2 = this.points[i - 1];
      const hue = p.map(Math.sin(i / 10), -1, 1, 0, 255);
      p.stroke(hue, 50, 50);
      if (i > 2) {
        p.line(p1.x, p1.y, p2.x, p2.y);
      }
    }
    
    this.theta += p.PI / 10;
    this.radius += 0.5;
  }
}