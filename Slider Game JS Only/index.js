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

// private slideCurrentLevel(p: p5) {
//   const block = this.blocks[this.blocks.length - 1];
//   const bound = {
//     max: 600,
//     left: () => -1 * (p.width / 2) > -1 * bound.max ? -1 * (p.width / 2) : -1 * bound.max,
//     right: () => (p.width / 2) < bound.max ? (p.width / 2) - block.width : bound.max - block.width
//   }
//   const x = p.map(p.sin(this.loopDegree), -1, 1, bound.left(), bound.right());
//   block.setPosition(x, block.position.y);
//   if (this.loopDegree > 360) { this.loopDegree = 0 } else { this.loopDegree += 0.5 + (this.level / 10) }
// }