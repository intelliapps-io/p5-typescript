class Rect {
  width: number;
  height: number;
  floating: boolean = true;
  body: Matter.Body;

  constructor(x: number, y: number, width: number, height: number, options?: Matter.IChamferableBodyDefinition) {
    this.width = width;
    this.height = height;
    this.body = Matter.Bodies.rectangle(x, y, width, height, options);
    Matter.World.add(world, [ this.body ]);
  }

  removeFromWorld() {
    Matter.World.remove(world, this.body);
  }

  setPosition(x: number, y: number) {
    if (this.floating) {
      const options: Matter.IChamferableBodyDefinition = {
        position: {x, y}
      };
      Matter.Body.set(this.body, options);
    }
  }

  drop() {
    this.floating = false;
    const options: Matter.IChamferableBodyDefinition = {
      isStatic: false
    };
    Matter.Body.set(this.body, options);
  }


  draw(p: p5) {
    p.beginShape();
    this.body.vertices.forEach(v => p.vertex(v.x, v.y)); 
    p.endShape(p.CLOSE);
  }
}

// draw(p: p5) {
//   const posX = this.body.position.x;
//   const posY = this.body.position.y;
//   const vertices = this.body.vertices;

//   p.push();

//   p.translate(posX, posY);
//   p.rotate(this.body.angle);
//   p.rect(0, 0, this.width, this.height);

//   p.pop();
// }