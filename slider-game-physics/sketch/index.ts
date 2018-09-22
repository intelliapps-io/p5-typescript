const engine = Matter.Engine.create();
const world = engine.world;

class Sketch {
  loopDegree: number = 0;
  allowDrop: boolean = true;
  boxes: Array<Rect>;
  myRect: Rect;
  ground: Rect;
  height: number = 20;
  width: number = 400;
  level: number = 1;
  
  private numLoop(p: p5) {
    if (this.loopDegree > 360) { this.loopDegree = 0 } else { this.loopDegree ++ }
    return p.sin(p.radians(this.loopDegree));
  }

  private levelPosY(p: p5) {
    const groundY = this.ground.body.position.y - 30 ;
    return groundY - (this.level * this.height);
  }

  private addNextLevel(p: p5) {
    this.level ++; this.allowDrop = true;
    if (this.boxes.length > 1) {
      const boxA: Rect = this.boxes[this.boxes.length - 1];        
      const boxB: Rect = this.boxes[this.boxes.length - 2];
      const diffrence = boxB.body.position.x - boxA.body.position.x;
      const newWidth = Math.abs(this.width - Math.abs(diffrence));
      if (newWidth < this.width) {
        this.width = newWidth;
        // try {Matter.Body.set(this.boxes[this.boxes.length - 3].body, { isStatic: true })} catch(e) {}
        
        // TRIM BOX HANGOVER
        const vertsA = boxA.body.vertices;
        const vertsB = boxB.body.vertices;

        let boxAOptions: Matter.IChamferableBodyDefinition;

        if (diffrence > 0) { 
          boxAOptions = {
            vertices: [
              {x: vertsB[0].x , y: vertsA[0].y},
              vertsA[1],
              vertsA[2],
              {x: vertsB[3].x, y: vertsA[3].y},
            ]
          }
        } else { 
          boxAOptions = {
            vertices: [
              vertsA[0],
              {x: vertsB[1].x - 10, y: vertsA[1].y},
              {x: vertsB[2].x - 10, y: vertsA[2].y},
              vertsA[3]
            ]
          }
        }
        boxAOptions.isStatic = true;
        Matter.Body.set(boxA.body, boxAOptions); 
      } else { console.log("Game Over!") } // GAME OVER
      console.log(` boxA - boxB Diff: ${diffrence} `);
    }
    this.boxes.push(new Rect(p.width / 2, this.levelPosY(p), this.width, this.height, { friction: 1, isStatic: true }));
  }

  public setup(p: p5) {
    p.createCanvas(p.windowWidth, p.windowHeight);  
    p.rectMode(p.CENTER);
    this.ground = new Rect(p.width / 2, p.height - 10, p.width, 20, { isStatic: true, friction: 1 });
    
    // Add First Level
    this.boxes = [new Rect(p.width / 2, this.levelPosY(p), this.width, this.height, { friction: 1, isStatic: true })];
    
    Matter.Engine.run(engine);

    Matter.Events.on(engine, 'collisionStart', event => {
      var pairs = event.pairs;
      for (var i = 0; i < pairs.length; i++) {
        var pair = pairs[i];
        if (this.boxes.length > 2) {
          let bodyA: number = pair.bodyA.id;
          let bodyB: number = pair.bodyB.id;
          let boxA: number = this.boxes[this.boxes.length - 2].body.id;
          let boxB: number = this.boxes[this.boxes.length - 1].body.id;
          if (bodyA === boxA || bodyB === boxB) {
            this.addNextLevel(p);
          }
        }
      }
    });
  }
 
  public draw(p: p5) {
    p.background(51);
    const numLoop = this.numLoop(p) * 100;

    p.keyPressed = () => {
      if (p.keyCode === 32 && this.allowDrop) {
        this.boxes[this.boxes.length - 1].drop();
        this.allowDrop = false;
        if (this.boxes.length < 3) setTimeout(() => this.addNextLevel(p), 1000);
      }
    }

    this.boxes[this.boxes.length - 1].setPosition((p.width / 2) + numLoop, this.levelPosY(p)); 
    this.boxes.forEach(box => box.draw(p));
    this.ground.draw(p);
  }
}

const createSketch = (p: p5) => {
  const sketch = new Sketch();
  p.setup = () => sketch.setup(p);
  p.draw = () => sketch.draw(p);
}

const mySketch = new p5(createSketch);