class Earth {
  texture: p5.Image;
  thetaDefaults = { x: -1.4, y: 1.2, z: 0.5 };
  increment: number = 0;
  thetaX: number = this.thetaDefaults.x;
  thetaY: number = this.thetaDefaults.y;
  thetaZ: number = this.thetaDefaults.z;
  camX: number = 0;
  camY: number = 0;
  camZ: number = 0;

  public setup(p: p5) {
    this.texture = p.loadImage("../images/earth_texture.jpg");
  }

  public draw(p: p5) {
    const { camX, camY, camZ, increment } = this;

    this.camX =  Math.sin( increment ) * 400;
    this.camZ =  Math.cos( increment ) * 400;

    p.rotateX(this.thetaDefaults.y); // Rotates UP / DOWN
    p.rotateY(this.thetaDefaults.x);
    p.rotateZ(this.thetaDefaults.z);

    p.camera(camX, 0, camZ, 0, 1, 0, 0, 1, 0);
    
    p.texture(this.texture);
    p.sphere(200);

    this.increment += 0.01;
  }
}