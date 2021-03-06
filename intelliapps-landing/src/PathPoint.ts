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
    this.pos = window.p.createVector(x, y)
    this.velocity = window.p.createVector(0, 0)
    this.acceleration = window.p.createVector(0, 0)
  }

  private setTarget() {
    const [x, y] = getPathPoint(this.pathLines, this.totalLength, this.offset)
    this.target.x = x; this.target.y = y
  }

  private addForce = (force: p5.Vector) => this.acceleration.add(force)

  private createForce(target: p5.Vector, options: {
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

  private update() {
    const { p } = window

    // Seek Target
    this.addForce(this.createForce(this.target, {
      maxForce: 1,
      maxSpeed: 10,
    }))

    // Avoid Mouse
    this.addForce(this.createForce(window.MOUSE_VECTOR, {
      maxForce: 5,
      maxSpeed: 10,
      maxDist: 50,
      avoid: true
    }))

    // hanlde 2d motion
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