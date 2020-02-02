import p5 from "p5";

class Sketch {
  p: p5;
  
  constructor(p: p5) {
    this.p = p;
  }

  setup() {
    const { p } = this;
    p.createCanvas(p.windowWidth, p.windowHeight);
  }

  draw() {
    const { p } = this;
    p.background(150);
  }
}

const mySketch = new p5((p: p5) => {
  window.p = p                      // set global p5 property
  const sketch = new Sketch(p)      // create p5 sketch
  p.setup = () => sketch.setup()    // main setup method
  p.draw = () => sketch.draw()      // main draw method
});