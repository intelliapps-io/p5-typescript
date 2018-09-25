let gameOver = false;
let blockHue = 170;
let blockWidth = 400;
let blockHeight = 70;
let blocks = [];
let counter = 0;
let level = 0;
let highScore = 0;
const levelHeight = () => height - (blockHeight * (level + 1));

function resetGame() {
  gameOver = false;
  blockHue = 170;
  blockWidth = 400;
  blockHeight = 70;
  blocks = [];
  counter = 0;
  level = 0;

  // Put a block at the bottom
  blocks.push(new Block(0 - blockWidth / 2, levelHeight(), blockWidth, blockHeight, blockHue));
  nextLevel(); // Set the game to level 1 
}

function setup() {
  angleMode(DEGREES);
  createCanvas(windowWidth, windowHeight);
  resetGame();
}

function draw() {
  if (gameOver === false) {
    background(100);
    counter > 360 ? counter = 0 : counter ++; // Add 1 to counter value
    translate(width / 2, 0); // Set center of screen to x=0
    displayLevel();
    keyPressed = () => keyCode === 32 ? nextLevel() : null; // Place top block on spacebar press
  
    // shift scene down when blocks stack too high
    if (levelHeight() < height / 3) translate(0, -levelHeight() + Math.floor(height / 3)); 
  
    // Move top block side to side
    blocks[blocks.length - 1].x = (sin(counter) * 300) - (blockWidth / 2); 
    blocks.forEach(block => block.draw()); 
  } else {
    displayGameover();
    mousePressed = () => gameOver ? resetGame() : null;
  }
}

function nextLevel() {
  if (!gameOver) level ++; // Add 1 to level
  blockHue > 340 ? blockHue = 0 : blockHue += 15; // Increase the next block's hue

  if (level > 1 && !gameOver) {
    const blockA = blocks[blocks.length - 1];
    const blockB = blocks[blocks.length - 2];
    let diff = blockB.x - blockA.x;
  
    // Check if last block was not stacked
    let boundaryA = {start: blockA.x + (width / 4), end: 0}; 
    boundaryA.end = boundaryA.start + blockA.width;
    let boundaryB = {start: blockB.x + (width / 4), end: 0}; 
    boundaryB.end = boundaryB.start + blockB.width;
    if (boundaryA.end < boundaryB.start || boundaryA.start > boundaryB.end ) gameOver = true;

    // Reduce block width if it hangs over the one below it
    Math.abs(diff) < 5 ? diff = 0 : blockWidth = Math.abs(blockWidth - Math.abs(diff));
    blockA.width = blockWidth;
    if (diff >= 0) blockA.x = blockB.x; 
  }
  if (!gameOver) blocks.push(new Block(0, levelHeight(), blockWidth, blockHeight, blockHue));
}

function displayLevel() {
  push();
  colorMode(HSB);
  textSize(25);
  textStyle(BOLD);
  fill(blockHue, 40, 100);
  text('Level: ' + level, (-width / 2) + 10, 40);
  pop();
}

function displayGameover() {
  if (level > highScore) highScore = level;
  push();
  translate(width / 2, height / 2);
  background(252, 63, 63, 200);
  textStyle(BOLD);
  textAlign(CENTER);
  
  textSize(60);
  text('Game Over', 0, -100);

  textSize(25);
  text('Your Score: ' + level, -100, 0);
  text('High Score: ' + highScore, 100, 0);

  textSize(20);
  textStyle(ITALIC);
  text('Click to play again', 0, 100);
  pop();
}

class Block {
  constructor(x, y, width, height, hue) {
    this.x = x; 
    this.y = y; 
    this.width = width; 
    this.height = height; 
    this.hue = hue;
  }

  draw() {
    push();
    translate(this.x, this.y);
    colorMode(HSB);
    noStroke();
    fill(this.hue, 70, 100);
    rect(0, 0, this.width, this.height); // Main Block

    const border = this.width > 18 ? 10 : 3;
    const corners = {
      top: {
        left: {x: border, y: border},
        right: {x: this.width - border, y: border}
      },
      bottom: {
        left: {x: border, y: this.height - border},
        right: {x: this.width - border, y: this.height - border}
      }
    };

    fill(this.hue, 20, 255); // top
    quad(0, 0, this.width, 0, corners.top.right.x, corners.top.right.y, corners.top.left.x, corners.top.left.y); 

    fill(this.hue, 40, 255); // left
    quad(0, 0, corners.top.left.x, corners.top.left.y , corners.bottom.left.x, corners.bottom.left.y, 0, this.height); 

    fill(this.hue, 40, 0, 0.4); // bottom
    quad(corners.bottom.left.x, corners.bottom.left.y, corners.bottom.right.x, corners.bottom.right.y, this.width, this.height, 0, this.height); 

    fill(this.hue, 20, 0, 0.25); // right
    quad(corners.top.right.x, corners.top.right.y, this.width, 0, this.width, this.height, corners.bottom.right.x, corners.bottom.right.y); 

    pop();
  }
}