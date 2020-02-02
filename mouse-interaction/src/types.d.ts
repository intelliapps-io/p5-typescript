import p5 = require("p5");

declare global {
  interface Window { 
    p: p5
    ZERO_VECTOR: p5.Vector
    MOUSE_VECTOR: p5.Vector
  }
}