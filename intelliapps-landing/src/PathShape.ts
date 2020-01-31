import p5 from "p5"
import { Interface } from "readline"

export interface IPathShapeOptions {
  scale: number
}

interface IPathLine {
  p1: p5.Vector
  p2: p5.Vector
  distFrom: number
  distTo: number
}

const getPathLines = (vertices: p5.Vector[]) => {
  let totalLength = 0, pathLines: IPathLine[] = []
  for (let i = 0; i < vertices.length; i++) {
    const lastDistTo = i - 1 > 0 ? pathLines[i - 1].distTo : 0,
      p1 = vertices[i],
      p2 = vertices[i === vertices.length - 1 ? 0 : i + 1],
      distFrom = lastDistTo,
      distTo = distFrom + p1.dist(p2)
    pathLines.push({ p1, p2, distFrom, distTo })
  }
  return pathLines
}

const getPathLength = (vertices: p5.Vector[]) => {
  let length = 0
  vertices.forEach((p1, i) => {
    const p2 = vertices[i === vertices.length - 1 ? 0 : i + 1]
    length += p1.dist(p2)
  })
  return length
}

export class PathShape {
  pathLines: IPathLine[]
  pointCount: number
  totalLength: number

  constructor(vertices: p5.Vector[], pointCount: number) {
    this.pathLines = getPathLines(vertices)
    this.totalLength = getPathLength(vertices)
    this.pointCount = pointCount

    console.log(this.totalLength, this.pathLines[this.pathLines.length - 1].distTo)
  }

  createPoints(): p5.Vector[] {
    let points: p5.Vector[] = []
    const spacing = this.totalLength / this.pointCount

    console.log(this.pathLines)
    console.log(spacing)

    // go over length of path
    for (let distance = 0; distance < this.totalLength - spacing; distance += spacing) {
      const pathLine = this.pathLines.find(
        _pathLine => _pathLine.distFrom <= distance && _pathLine.distTo >= distance)
      if (pathLine) {
        const pathLength = pathLine.distTo - pathLine.distFrom,
          angleBetween = Math.atan2(pathLine.p2.y - pathLine.p1.y, pathLine.p2.x - pathLine.p1.x),
          distAlongPath = distance - pathLine.distFrom
        const p1 = pathLine.p1
        const p2x = p1.x + distAlongPath * Math.cos(angleBetween)
        const p2y = p1.y + distAlongPath * Math.sin(angleBetween)
        points.push(window.p.createVector(p2x, p2y))
      }
    }

    console.log(points)

    return points
  }

  draw() {
    const { p } = window
    p.fill(0, 0, 0)
    p.strokeWeight(2)
    this.createPoints().forEach(point => p.point(point.x, point.y))
  }
}