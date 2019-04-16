import * as p5 from "p5";

class Sketch {
  p: p5;
  totalCols = 5;
  totalRows = 10;
  pointArray: Array<p5.Vector>[]


  constructor(p: p5) {
    this.p = p;
    this.pointArray = this.generatePointArray(this.totalCols, this.totalRows);
  }

  setup() {
    const { p } = this;
    p.createCanvas(p.windowWidth, p.windowHeight);
    console.log(this.pointArray);
  }

  generatePointArray(totalCols: number, totalRows: number): Array<p5.Vector>[] {
    const { p } = this;
    let rows: Array<p5.Vector>[] = [];
    for (let row = 0; row < totalRows; row++) {
      let cols = new Array<p5.Vector>();
      const yPositon = ((p.windowHeight / totalRows) * row) + ((p.windowHeight / totalRows) / 2);
      for (let col = 0; col < totalCols; col++) {
        const xPosition = ((p.windowWidth / totalCols) * col) + ((p.windowWidth / totalCols) / 2);
        cols.push(p.createVector(Math.floor(xPosition), Math.floor(yPositon)));
      }
      rows.push(cols);
    }
    return rows;
  }

  plotPoints() {
    const { p } = this;
    this.pointArray.forEach((cols, row) => cols.forEach((point, col) => {
      p.push();
      p.strokeWeight(5);
      p.stroke(12, 100, 20);
      p.point(point.x, point.y);
      p.pop();
    }));
  }

  plotTriangle(p1: p5.Vector, p2: p5.Vector, p3: p5.Vector) {
    const { p } = this;
    p.triangle(p1.x, p1.y, p2.x, p2.y, p3.x, p3.y);
  }

  drawTriangles() {
    const { p, pointArray } = this;
    p.push();
    p.strokeWeight(5);
    p.stroke(200, 140, 20);
    for (let rowIndex = 0; rowIndex < pointArray.length; rowIndex++) {
        const col = pointArray[rowIndex];
        const prevCol: Array<p5.Vector> | null = rowIndex > 0 ? pointArray[rowIndex - 1] : null;
        const nextCol: Array<p5.Vector> | null = rowIndex < pointArray.length ? pointArray[rowIndex + 1] : null;
        col.forEach((point, colIndex) => {
          const nextPoint: p5.Vector | null = colIndex < col.length ? col[colIndex + 1] : null;
          const topPoint: p5.Vector | null = prevCol ? prevCol[colIndex + 1] : null;
          const bottomPoint: p5.Vector | null = nextCol ? nextCol[colIndex] : null;
          
          if (nextPoint) {
            if (bottomPoint) {
              this.plotTriangle(point, nextPoint, bottomPoint);
            }
            if (topPoint) {
              this.plotTriangle(point, nextPoint, topPoint);
            }
          }
        })
    }
    p.pop();
  }

  draw() {
    const { p } = this;
    p.background(150);
    this.plotPoints();
    this.drawTriangles();
    p.noLoop();
  }
}

const mySketch = new p5((p: p5) => {
  const sketch = new Sketch(p);
  p.setup = () => sketch.setup();
  p.draw = () => sketch.draw();
});