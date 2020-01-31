import p5 from "p5"
import { LogoShape } from "./LogoShape"
import { Dots } from "./dots";

class Sketch {
  p: p5
  logo: LogoShape
  dots: Dots

  constructor(p: p5) {
    this.p = p;
    this.logo = new LogoShape(p, 50, 50, { scale: 2 })
    this.dots = new Dots(p)
  }

  setup() {
    const { p } = this;
    p.createCanvas(p.windowWidth, p.windowHeight);
  }

  draw() {
    const { p } = this
    p.background(150)
    
    this.dots.draw()

    // this.logo.draw()

    // p.frameRate(10)
  }
}

const mySketch = new p5((p: p5) => {
  window.p = p                      // set global p5 property
  const sketch = new Sketch(p)      // create p5 sketch
  p.setup = () => sketch.setup()    // main setup method
  p.draw = () => sketch.draw()      // main draw method
});