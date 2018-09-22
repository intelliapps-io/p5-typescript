class Sketch {
  blocks: Array<Block> = [];
  loopDegree: number = 0;
  allowDrop: boolean = true;
  height: number = 20;
  width: number = 300;
  level: number = 1;
  levelHeight = (p: p5) => p.height - (this.height * (this.level + 1));

  private slideCurrentLevel(p: p5) { 
    const block = this.blocks[this.blocks.length - 1];
    const x = p.map(p.sin(this.loopDegree), -1, 1, -1 * (p.width / 2), (p.width / 2) - block.width);
    block.setPosition(x, block.position.y); 
    if (this.loopDegree > 358) { this.loopDegree = 0 } else { this.loopDegree ++ }
  }

  private onPlaceBlock(p: p5) {
    p.keyPressed = () => { 
      if (p.keyCode === 32 ) {
        this.nextLevel(p);
      }
    }
    // if (p.keyIsPressed && p.keyCode === 32) {
    //   this.nextLevel(p);
    // }
  }
  
  private nextLevel(p: p5) {
    this.level ++; 
    const blockA = this.blocks[this.blocks.length - 1];
    const blockB = this.blocks[this.blocks.length - 2];
    const newBlock = new Block(0, this.levelHeight(p) , this.width, this.height, p);
    this.blocks.push(newBlock);
  }

  public setup(p: p5) {
    p.angleMode(p.DEGREES);
    p.createCanvas(p.windowWidth, p.windowHeight);  
    this.blocks.push(new Block(0 - this.width / 2, p.height - this.height, this.width, this.height, p)); // initialize level 0
    this.blocks.push(new Block(0, this.levelHeight(p), this.width, this.height, p)); // initialize level 1
 }

  public draw(p: p5) {
    p.background(100);
    p.translate(p.width / 2, 0); // center x-axis
    if (this.levelHeight(p) < p.height / 2) p.translate(0, (-1 * this.levelHeight(p)) + p.height / 2); // shift scene down when blocks stack too high
    
    this.slideCurrentLevel(p);
    this.onPlaceBlock(p);
    this.blocks.forEach(block => block.draw(p)); // render blocks

  }
}

const createSketch = (p: p5) => {
  const sketch = new Sketch();
  p.setup = () => sketch.setup(p);
  p.draw = () => sketch.draw(p);
}

const mySketch = new p5(createSketch);