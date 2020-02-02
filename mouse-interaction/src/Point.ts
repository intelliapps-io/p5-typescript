import p5 from "p5"



export class Point {
  protected target: p5.Vector
  protected pos: p5.Vector
  protected velocity: p5.Vector
  protected acceleration: p5.Vector

  constructor(target: p5.Vector, pos?: p5.Vector) {
    const { p } = window
    this.target = target
    this.pos = pos ? pos : this.target
    this.velocity = p.createVector()
    this.acceleration = p.createVector()
  }

  addForce = (force: p5.Vector) => this.acceleration.add(force)

  createForce(target: p5.Vector, options: {
    maxForce: number,
    maxSpeed: number,
    avoid?: boolean,
    maxDist?: number
  }): p5.Vector {
    const { maxForce, maxSpeed, maxDist, avoid } = options, { p } = window

    const desired = p5.Vector.sub(target, this.pos), dist = desired.mag()

    if (avoid) {
      desired.mult(-1)
      desired.setMag(p.map(dist, 100, 0, 0, maxSpeed))
    } else
      desired.setMag(p.map(dist, 0, 100, 0, maxSpeed))


    const steer = p5.Vector.sub(desired, this.velocity)
    steer.limit(p.map(dist, 0, 100, 0, maxForce))

    if (!maxDist || dist <= maxDist)
      return steer
    else
      return window.ZERO_VECTOR
  }

  update() {
    const { p } = window

    // Seek Target
    this.addForce(this.createForce(this.target, {
      maxForce: 0.3,
      maxSpeed: 5,
    }))

    // Avoid Mouse
    this.addForce(this.createForce(window.MOUSE_VECTOR, {
      maxForce: 5,
      maxSpeed: 5,
      maxDist: 50,
      avoid: true
    }))

    // hanlde 2d motion
    this.pos.add(this.velocity)
    this.velocity.add(this.acceleration)
    this.acceleration.mult(0)
  }

  draw() {
    const { p } = window
    p.strokeWeight(4)
    p.point(this.pos.x, this.pos.y)
    this.update()
  }
}