class Particle {
  center: p5.Vector
  pos: p5.Vector;
  velocity: p5.Vector;
  acceleration: p5.Vector;

  trail: Array<Array<number>> = [];

  constructor(p: p5) {
    this.center = p.createVector(p.width / 2, p.height / 2);
    this.pos = this.center;
    this.velocity = p.createVector(p.random(-10, 10), p.random(-10, 10));
    this.acceleration = p.createVector(0, 0);
  }

  private update(p: p5) {
    let mouse = p.createVector(p.mouseX, p.mouseY);
    mouse.sub(this.pos);
    mouse.setMag(2);

    this.acceleration = mouse;
    this.acceleration.add(p.createVector(p.random(-0.1, 0.1), p.random(-0.1, 0.1)));

    this.velocity.add(this.acceleration);
    this.pos.add(this.velocity);

    if (this.pos.x > p.width || this.pos.x < 0) {
      this.velocity.x = this.velocity.x * -1;
    }
    if (this.pos.y > p.height || this.pos.y < 0) {
      this.velocity.y = this.velocity.y * -1;
    }

    this.velocity.limit(20);
  }

  private renderTrail(p: p5) {
    for(let i = 0; i < this.trail.length - 1; i += 1) {
      let x1 = this.trail[i][0];
      let y1 = this.trail[i][1];
      let x2 = this.trail[i+1][0];;
      let y2 = this.trail[i+1][1];;
      const stroke = p.map(i, 0, this.trail.length, 0, 12);
      const alpha = p.map(i, 0, this.trail.length, 255, 0 );
      p.colorMode(p.HSB);
      p.stroke(alpha, 255, 255, 255);
      p.strokeWeight(10);
      p.strokeWeight(stroke);
      p.line(x1, y1, x2, y2);
    }
    if (this.trail.length > 100) {
      this.trail.splice(0, 1);
    }
  }

  public draw(p: p5) {
    this.renderTrail(p);
    this.update(p);
    this.trail.push([this.pos.x, this.pos.y]);
  }
}