import p5 from "p5"
import { LogoShape } from "./LogoShape"
import { PathShape } from "./PathShape"

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

class Sketch {
  p: p5
  logo: LogoShape
  pathShape: PathShape

  constructor(p: p5) {
    this.p = p;
    this.logo = new LogoShape(p, 50, 50, { scale: 1 })
    this.pathShape = new PathShape(getVertices(50, 50, 1), 300)
  }

  setup() {
    const { p } = this;
    p.createCanvas(p.windowWidth, p.windowHeight);
  }

  draw() {
    const { p } = this
    p.background(150)

    this.pathShape.draw()
    
    // this.logo.draw()

    // p.frameRate(5)
    // p.noLoop()
  }
}

const mySketch = new p5((p: p5) => {
  window.p = p                      // set global p5 property
  const sketch = new Sketch(p)      // create p5 sketch
  p.setup = () => sketch.setup()    // main setup method
  p.draw = () => sketch.draw()      // main draw method
});