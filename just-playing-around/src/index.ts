import * as p5 from "p5";

class Sketch {
  p: p5;
  
  constructor(p: p5) {
    this.p = p;
  }

  setup() {
    const { p } = this;
    p.createCanvas(p.windowWidth, p.windowHeight);
    p.background(150);

  }

  draw() {
    const { p } = this;

    p.fill(1, 1, 1);
    p.ellipse(p.mouseX, p.mouseY, 10, 10);
  }
}

const mySketch = new p5((p: p5) => {
  const sketch = new Sketch(p);
  p.setup = () => sketch.setup();
  p.draw = () => sketch.draw();
});