import * as p5 from "p5";
import Vehicle from "./Vehicle";

class Sketch {
  p: p5
  agent: Vehicle
  
  constructor(p: p5) {
    this.p = p;
    this.agent = new Vehicle(p);
  }

  setup() {
    const { p } = this;
    p.createCanvas(p.windowWidth, p.windowHeight);
  }

  draw() {
    const { p } = this;
    p.background(150);
    this.agent.draw();
    p.fill(100, 100, 100);
    p.ellipse(p.mouseX, p.mouseY, 15, 15);
  }
}

const mySketch = new p5((p: p5) => {
  const sketch = new Sketch(p);
  p.setup = () => sketch.setup();
  p.draw = () => sketch.draw();
});