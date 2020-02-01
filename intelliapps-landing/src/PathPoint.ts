import p5 from "p5"
import { IPathLine, getPathLength, getPathLines } from "./helpers/path"

function getBaseOffset(totalLength: number, _offset: number): number {
  if (_offset >= 0 && _offset <= totalLength) return _offset
  const base = _offset - (Math.floor(_offset / totalLength)) * totalLength
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
  } else {
    console.error(new Error('no path found'))
    return [0, 0]
  }
}

export class PathPoint {
  protected point: p5.Vector
  protected offset: number
  protected pathLines: IPathLine[]
  protected totalLength: number
  velocity: p5.Vector;
  acceleration: p5.Vector;

  constructor(vertices: p5.Vector[], offset: number) {
    this.offset = offset
    this.pathLines = getPathLines(vertices)
    this.totalLength = getPathLength(vertices)
    const [x, y] = getPathPoint(this.pathLines, this.totalLength, this.offset)
    this.point = window.p.createVector(x, y)
    this.velocity = window.p.createVector(0, 0)
    this.acceleration = window.p.createVector(0, 0)
  }

  private updatePathPoint() {
    const [x, y] = getPathPoint(this.pathLines, this.totalLength, this.offset)
    this.point.x = x; this.point.y = y
  }

  private update() {
    const { p } = window
    let mouse = p.createVector(p.mouseX, p.mouseY);
    mouse.sub(this.point);
    mouse.setMag(-50);

    this.acceleration = mouse;
    this.acceleration.add(p.createVector(0.1, 0.1));

    this.velocity.add(this.acceleration);
    this.point.add(this.velocity);

    if (this.point.x > p.width || this.point.x < 0) {
      this.velocity.x = this.velocity.x * -1;
    }
    if (this.point.y > p.height || this.point.y < 0) {
      this.velocity.y = this.velocity.y * -1;
    }

    this.velocity.limit(2);
  }

  public draw(styler?: () => void) {
    const { p } = window
    if (styler) {
      p.push()
        styler()
        p.point(this.point.x, this.point.y)
      p.pop()
    } else
      p.point(this.point.x, this.point.y)
  }

  public getPoint = () => this.point

  public setOffset(func: (offset: number) => number) {
    this.offset = func(this.offset)
    this.updatePathPoint()
    this.update()
  }
}