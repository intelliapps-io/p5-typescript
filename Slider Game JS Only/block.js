// class Block {
//   constructor(x, y, width, height, hue) {
//     this.x = x; 
//     this.y = y; 
//     this.width = width; 
//     this.height = height; 
//     this.hue = hue;
//   }

//   draw() {
//     push();
//     translate(this.x, this.y);
//     colorMode(HSB);
//     noStroke();
//     fill(this.hue, 70, 100);
//     rect(0, 0, this.width, this.height); // Main Block

//     const border = this.width > 18 ? 10 : 3;
//     const corners = {
//       top: {
//         left: {x: border, y: border},
//         right: {x: this.width - border, y: border}
//       },
//       bottom: {
//         left: {x: border, y: this.height - border},
//         right: {x: this.width - border, y: this.height - border}
//       }
//     };

//     fill(this.hue, 20, 255); // top
//     quad(0, 0, this.width, 0, corners.top.right.x, corners.top.right.y, corners.top.left.x, corners.top.left.y); 

//     fill(this.hue, 40, 255); // left
//     quad(0, 0, corners.top.left.x, corners.top.left.y , corners.bottom.left.x, corners.bottom.left.y, 0, this.height); 

//     fill(this.hue, 40, 0, 0.4); // bottom
//     quad(corners.bottom.left.x, corners.bottom.left.y, corners.bottom.right.x, corners.bottom.right.y, this.width, this.height, 0, this.height); 

//     fill(this.hue, 20, 0, 0.25); // right
//     quad(corners.top.right.x, corners.top.right.y, this.width, 0, this.width, this.height, corners.bottom.right.x, corners.bottom.right.y); 

//     pop();
//   }
// }