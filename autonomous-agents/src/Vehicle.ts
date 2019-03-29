import p5 = require("p5");

class Vehicle {
  p: p5;
  target: p5.Vector;
  position: p5.Vector;
  velocity: p5.Vector;
  acceleration: p5.Vector;
  MAX_SPEED = 3;
  MAX_FORCE = 0.6;

  constructor(p: p5) {
    this.p = p;
    this.target = p.createVector(p.mouseX, p.mouseY);
    this.position = p.createVector(0, 0);
    this.velocity = p.createVector(0, 0);
    this.acceleration = p.createVector(0, 0);
  }

  private update() {
    const { p } = this;
    this.target.x = p.mouseX;
    this.target.y = p.mouseY;
    this.velocity = this.velocity.add(this.acceleration);
    this.velocity = this.velocity.limit(this.MAX_SPEED);
    this.position = this.position.add(this.velocity);
    this.acceleration = this.acceleration.mult(0);
  }

  private applyForce(force: p5.Vector) {
    this.acceleration = this.acceleration.add(force);
  }

  private seek(target: p5.Vector) {
    const { p } = this;
    let desired = p5.Vector.sub(this.target, this.position);
    desired = desired.normalize();
    desired = desired.mult(this.MAX_SPEED);
    let steer = p5.Vector.sub(desired, this.velocity);
    steer = steer.limit(this.MAX_FORCE);
    this.applyForce(steer);
  }

  public draw() {
    this.update();
    const { p, position } = this;

    p.ellipse(position.x, position.y, 20, 20);    
  }
}

export default Vehicle;