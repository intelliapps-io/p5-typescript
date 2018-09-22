const engine = Matter.Engine.create();
const world = engine.world;

class Sketch {
  boxes: Array<Rect> = [];
  ground: Rect;
  grid: Array<[]>;

  /* GRID
  [
    [cell, cell, cell],
    [cell, cell, cell]
  ]
  */

  createGrid(p: p5) {
    const rows = 10;
    const columns = 10;
    const cellWidth = p.width / columns;
    
  }

  public setup(p: p5) {
    p.rectMode(p.CENTER);
    p.createCanvas(p.windowWidth, p.windowHeight);


    
    this.ground = new Rect(p.width / 2, p.height - 10, p.width, 20, { isStatic: true, friction: 1 });
    Matter.Engine.run(engine);
  }

  public draw(p: p5) {
    p.background(51);
    this.ground.draw(p);
  }
}

const createSketch = (p: p5) => {
  const sketch = new Sketch();
  p.setup = () => sketch.setup(p);
  p.draw = () => sketch.draw(p);
}

const mySketch = new p5(createSketch);