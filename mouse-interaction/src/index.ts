import p5 from "p5";
import { Point } from "./Point";

class Sketch {
  p: p5;
  points: Point[] = []
  
  constructor(p: p5) {
    this.p = p;
    for (let i = 0; i < 100; i++) 
      this.points.push(new Point(
        p.createVector(p.random(p.windowWidth), p.random(p.windowHeight)),
        p.createVector(p.random(p.windowWidth), p.random(p.windowHeight))))
  }

  setup() {
    const { p } = this;
    p.createCanvas(p.windowWidth, p.windowHeight);
  }

  draw() {
    const { p } = this;
    p.background(150);

    this.points.forEach(point => point.draw())
  }
}

const mySketch = new p5((p: p5) => {
  window.p = p                          // set global p5 property
  window.ZERO_VECTOR = p.createVector() // global zero vector

  // global mouse vector
  window.MOUSE_VECTOR = p.createVector(p.mouseX, p.mouseY)
  window.addEventListener('mousemove', () => {
    window.MOUSE_VECTOR.x = p.mouseX
    window.MOUSE_VECTOR.y = p.mouseY
  })

  const sketch = new Sketch(p)          // create p5 sketch
  p.setup = () => sketch.setup()        // main setup method
  p.draw = () => sketch.draw()          // main draw method
});

