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
    p.translate(p.width / 2, 0);
    p.background(150);
  }
}

const mySketch = new p5((p: p5) => {
  const sketch = new Sketch(p);
  p.setup = () => sketch.setup();
  p.draw = () => sketch.draw();
});