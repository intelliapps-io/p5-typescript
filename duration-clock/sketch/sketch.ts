class Sketch {
  p: p5;
  clock: Clock;
  width: number = 300;
  
  constructor(p: p5) {
    this.p = p;
  }

  setup() {
    const { p, width } = this;
    p.createCanvas(width, width);
    p.angleMode("RADIANS");
    this.clock = new Clock(p);
  }

  draw() {
    const { p } = this;
    p.translate(p.width / 2, p.height / 2);
    this.clock.draw();
  }
}

const mySketch = new p5((p: p5) => {
  const sketch = new Sketch(p);
  p.setup = () => sketch.setup();
  p.draw = () => sketch.draw();
});

class Clock {
  p: p5;

  constructor(p: p5) {
    this.p = p;
  }

  setup() {

  }

  drawDuration(minuets: number) {
    const { p } = this;
    
  }

  drawHourTicks(length: number) {
    const { p } = this;
    p.stroke(150, 150, 150);
    p.strokeWeight(2);
    for (let i = 0; i < 12; i++) {
      const angle = (p.TWO_PI / 12) * i;
      const center = p.createVector(0, 0);
      const radius = (p.width / 2) - 5;
      const x1 = p.cos(angle) * radius;
      const y1 = p.sin(angle) * radius;
      const x2 = p.cos(angle) * (radius - length);
      const y2 = p.sin(angle) * (radius - length);
      p.line(x1, y1, x2, y2);
    }
  }

  draw() {
    const { p } = this;
    const width = p.width;
    p.fill(240, 240, 240);
    p.stroke(150, 150, 150);
    p.strokeWeight(2);
    p.ellipse(0, 0, width - 10, width - 10);
    this.drawHourTicks(10);
  }

}
