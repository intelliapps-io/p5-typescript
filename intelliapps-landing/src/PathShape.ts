import p5 from "p5"
import { IPathLine, getPathLength, getPathLines } from "./helpers/path"
import { PathPoint } from "./PathPoint"

export interface IPathShapeOptions {
  scale: number
}

export class PathShape {
  pathPoints: PathPoint[] = []
  pathLines: IPathLine[]
  pointCount: number
  totalLength: number

  constructor(vertices: p5.Vector[], pointCount: number) {
    this.pathLines = getPathLines(vertices)
    this.totalLength = getPathLength(vertices)
    this.pointCount = pointCount
    this.createPoints(vertices)
  }

  createPoints(vertices: p5.Vector[]) {
    const spacing = this.totalLength / this.pointCount
    for (let offset = 0; offset < this.totalLength; offset += spacing) 
      this.pathPoints.push(new PathPoint(vertices, offset))
  }

  draw() {
    const { p } = window
    p.fill(0, 0, 0, 50)
    p.strokeWeight(0)

    p.beginShape()
    
    this.pathPoints.forEach((pathPoint, i) => {
      const point = pathPoint.getPoint()
      pathPoint.draw(() => {
        p.strokeWeight(0)
      })
      p.curveVertex(point.x, point.y)
        
      pathPoint.setOffset(offset => offset + 0.5)
    })
    p.endShape()
  }
}