import p5 from "p5"

interface ILogoShapeOptions {
  scale?: number
}

type ShiftDirection = "INC" | "DEC"

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

export class LogoShape {
  p: p5;
  x: number
  y: number
  scale: number
  vertices: Array<p5.Vector>

  constructor(p: p5, x: number, y: number, options?: ILogoShapeOptions) {
    this.p = p
    this.x = x
    this.y = y
    this.scale = options && options.scale ? options.scale : 1
    this.vertices = getVertices(this.x, this.y, this.scale)
  }


  draw() {
    const { p } = this
    const pointDist = 10;
    let points: p5.Vector[] = []
    this.vertices.forEach((vertex, i) => {
      
    })

    p.color(0)
    points.forEach(point => p.point(point.x, point.y))
      
    // p.beginShape()
    // this.vertices.forEach((vertex, i) => {
    //   const mouse = p.createVector(p.mouseX, p.mouseY)
    //   const point = vertex.copy()

    //   let x = point.x
    //   let y = point.y

    //   // create vertex
    //   p.vertex(x, y)
    // })
    // p.endShape()

  }
}