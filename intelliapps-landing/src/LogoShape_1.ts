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

  // COLOR
  // color: [number, number, number, number] = [85, 170, 255, 255]
  color: [number, number, number, number] = [85, 170, 255, 255]
  colorShiftDirection: [ShiftDirection, ShiftDirection, ShiftDirection, ShiftDirection] = ["INC", "INC", "INC", "INC"]

  shiftColor(colorIndex: number, by: number) {
    if (colorIndex !== 0 && colorIndex !== 1 && colorIndex !== 2 && colorIndex !== 3)
      throw new Error('Color index can be only 0, 1, 2, 3')
    if (this.colorShiftDirection[colorIndex] === "INC") {
      const max = 255
      const nextValue = this.color[colorIndex] + by
      if (nextValue > max) {
        this.colorShiftDirection[colorIndex] = "DEC"
        this.color[colorIndex] = max
      } else
        this.color[colorIndex] = nextValue
    } else if (this.colorShiftDirection[colorIndex] === "DEC") {
      const min = 85
      const nextValue = this.color[colorIndex] - by
      if (nextValue < min) {
        this.colorShiftDirection[colorIndex] = "INC"
        this.color[colorIndex] = min
      } else
        this.color[colorIndex] = nextValue
    }
  }


  draw() {
    const { p } = this

    const shiftSpeed = 0.5
    this.shiftColor(0, shiftSpeed * Math.abs(Math.sin(this.color[1])))
    this.shiftColor(1, shiftSpeed * Math.abs(Math.sin(this.color[2])))
    this.shiftColor(2, shiftSpeed * Math.abs(Math.sin(this.color[0])))

    p.fill(this.color[0], this.color[1], this.color[2], this.color[3])
    

    p.beginShape()
    this.vertices.forEach((vertex, i) => {
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