import p5 from "p5";
import { LogoShape } from "./LogoShape";

export class Dots {
  p: p5
  logoShape: LogoShape

  constructor(p: p5) {
    this.p = p;
    this.logoShape = new LogoShape(p, 30, 30, {})
  }

  draw() {
    const { p } = this
    const mouse = p.createVector(p.mouseX, p.mouseY)

    this.logoShape.draw()

  }
}