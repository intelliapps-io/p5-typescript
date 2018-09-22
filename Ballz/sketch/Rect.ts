class Rect {
  width: number;
  height: number;
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

  draw(p: p5) {
    const posX = this.body.position.x;
    const posY = this.body.position.y;

    p.push();

    p.translate(posX, posY);
    p.rotate(this.body.angle);
    p.rect(0, 0, this.width, this.height);

    p.pop();
  }
}