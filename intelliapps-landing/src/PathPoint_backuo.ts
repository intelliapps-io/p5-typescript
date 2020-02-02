import p5 from "p5"
import { IPathLine, getPathLength, getPathLines } from "./helpers/path"

function getBaseOffset(totalLength: number, _offset: number): number {
  if (_offset >= 0 && _offset <= totalLength)
    return _offset
  const base = _offset - Math.floor(_offset / totalLength) * totalLength
  return _offset < 0 ? totalLength - base : base
}

const getPathPoint = (pathLines: IPathLine[], totalLength: number, _offset: number): [number, number] => {
  const offset = getBaseOffset(totalLength, _offset)
  const pathLine = pathLines.find(_pathLine => _pathLine.distFrom <= offset && _pathLine.distTo >= offset)
  if (pathLine) {
    const angleBetween = Math.atan2(pathLine.p2.y - pathLine.p1.y, pathLine.p2.x - pathLine.p1.x),
      distAlongPath = offset - pathLine.distFrom,
      p1 = pathLine.p1,
      p2x = p1.x + distAlongPath * Math.cos(angleBetween),
      p2y = p1.y + distAlongPath * Math.sin(angleBetween)
    return [p2x, p2y]
  }
  return [0, 0]
}

export class PathPoint {
  protected offset: number
  protected pathLines: IPathLine[]
  protected totalLength: number
  protected target: p5.Vector
  protected pos: p5.Vector
  protected velocity: p5.Vector
  protected acceleration: p5.Vector

  constructor(vertices: p5.Vector[], offset: number) {
    this.offset = offset
    this.pathLines = getPathLines(vertices)
    this.totalLength = getPathLength(vertices)
    const [x, y] = getPathPoint(this.pathLines, this.totalLength, this.offset)
    this.target = window.p.createVector(x, y)
    this.pos = this.target
    // this.pos = window.p.createVector(window.p.random( window.p.windowWidth), window.p.random(window.p.windowHeight))
    this.velocity = window.p.createVector(0, 0)
    this.acceleration = window.p.createVector(0, 0)
  }

  private setTarget() {
    const [x, y] = getPathPoint(this.pathLines, this.totalLength, this.offset)
    this.target.x = x; this.target.y = y
  }

  private addForce(force: p5.Vector) {
    this.acceleration.add(force)
  }

  private getSteerForce(target: p5.Vector, options: {
    maxForce: number,
    maxSpeed: number,
    avoid?: boolean,
    maxDistance?: number
  }): p5.Vector {
    const { p } = window
    const { maxForce, maxSpeed, avoid, maxDistance } = options
    let force = maxForce
    let speed = maxSpeed

    // seeking direction
    const desired = p5.Vector.sub(target, this.pos)
    const dist = desired.mag()
    if (dist <= (maxDistance ? maxDistance : dist)) {
      // speed = p.map(dist, 0, maxDistance ? maxDistance : 100, 0, maxSpeed)
      speed = p.map(dist,  maxDistance ? maxDistance : 100, 0, 0, maxSpeed)
      desired.mult(avoid ? -1 : 1)
      desired.setMag(speed)

      // steering force
      const steer = p5.Vector.sub(desired, this.velocity)
      steer.limit(force)

      return steer
    } else {
      return p.createVector(0,0) // TODO: make global
    }
  }

  private update() {
    const { p } = window
    const mouse = p.createVector(p.mouseX, p.mouseY) // TODO: make global

    // seek target
    const steer = this.getSteerForce(this.target, {
      maxForce: 1,
      maxSpeed: 3,
      maxDistance: 999999999
    })
    this.addForce(steer)

    // console.log(steer)

    // avoid mouse
    const avoid = this.getSteerForce(mouse, {
      maxForce: 10,
      maxSpeed: 50,
      maxDistance: 60,
      avoid: true,
    })
    this.addForce(avoid)

    this.pos.add(this.velocity)
    this.velocity.add(this.acceleration)
    this.acceleration.mult(0)
  }

  public draw(styler?: () => void) {
    const { p } = window
    this.update()
    if (styler) {
      p.push()
      styler()
      p.point(this.pos.x, this.pos.y)
      p.pop()
    } else
      p.point(this.pos.x, this.pos.y)
  }

  public getPoint = () => this.pos

  public setOffset(func: (offset: number) => number) {
    const offset = func(this.offset)
    if (this.offset !== offset) {
      this.offset = offset
      this.setTarget()
    }
  }
}