import p5 = require("p5")

export function loadImage(path: string): Promise<p5.Image> {
  return new Promise((resolve, reject) => {
    window.p.loadImage(path, img => resolve(img), errorEvent => reject(errorEvent))
  })  
}