import p5 from "p5"

interface ILogoShapeOptions {
  scale?: number
}

function getVertices(x: number, y: number, scale: number): Array<p5.Vector> {
  let vertices: Array<[number, number]> = [
    [165, 0],
    [213, 0],
    [72, 246],
    [116, 246],
    [261, 0],
    [423, 287],
    [283, 287],
    [236, 204],
    [261, 163],
    [308, 246],
    [352, 246],
    [261, 82],
    [140, 287],
    [0, 287],
    [165, 0],
  ]
  return vertices.map(vertex =>
    window.p.createVector(vertex[0] * scale + x, vertex[1] * scale + y))
}

const getPointsOnLine = (p1: p5.Vector, p2: p5.Vector): p5.Vector[] => {
  let points: p5.Vector[] = []
  const dist = p2.dist(p1),
    distX = p2.x - p1.x, distY = p2.y - p1.y,
    angleBetween = Math.atan2(distY, distX)

  // push first point
  points.push(p1)

  // create points along path
  let cursor = 0
  const spaceing = 10
  for (let i = 0; i < dist - spaceing; i += spaceing) {
    const _p1 = points[cursor]
    const _p2x = _p1.x + spaceing * Math.cos(angleBetween)
    const _p2y = _p1.y + spaceing * Math.sin(angleBetween)
    
    // add new point to array
    points.push(window.p.createVector(_p2x, _p2y))
    cursor++
  }

  // console.log({
  //   angleBetween, x: p2.x, xx: p1.x + dist * Math.cos(angleBetween)
  // })

  // // push last point
  // points.push(p2)

  return points
}

const getShapePoints = (vertices: p5.Vector[]): p5.Vector[] => {
  let points: p5.Vector[] = []
  for (let i = 0; i < vertices.length; i++) {
    const vertice1 = vertices[i]
    const vertice2 = vertices[i === vertices.length - 1 ? 0 : i + 1]
    points = [...points, ...getPointsOnLine(vertice1, vertice2)]
  }
  return points
}

export class LogoShape {
  p: p5;
  x: number
  y: number
  scale: number
  points: Array<p5.Vector>

  constructor(p: p5, x: number, y: number, options?: ILogoShapeOptions) {
    this.p = p
    this.x = x
    this.y = y
    this.scale = options && options.scale ? options.scale : 1
    this.points = getShapePoints(getVertices(this.x, this.y, this.scale))
  }

  draw() {
    const { p } = this
    const pointDist = 10

    p.fill(0, 0, 0)
    p.stroke(100, 100, 100)
    p.strokeWeight(5)
    this.points.forEach(point => p.point(point.x, point.y))

    p.fill(0, 0, 0, 0)
    p.strokeWeight(1)
    p.beginShape()
    this.points.forEach((vertex, i) => {
      const mouse = p.createVector(p.mouseX, p.mouseY)
      const point = vertex.copy()

      let x = point.x
      let y = point.y

      // create vertex
      p.vertex(x, y)
    })
    p.endShape()

  }
}