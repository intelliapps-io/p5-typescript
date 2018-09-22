function setup() {
  createCanvas(windowWidth, windowHeight);
  // frameRate(1);s
}

function draw() {
  // clear();
  loadPixels();

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const index = (x + y * width) * 4;
        const mapXToRGB = () => map(x, 0, width, 0, 255);
        const mapYToRGB = () => map(y, 0, height, 0, 255);
        pixels[index] = mapXToRGB();
        pixels[index+1] = (index / 4) % 16 && (index) % 16 === 0 ? 200 : 5;
        pixels[index+2] = mapYToRGB(); 
        // pixels[index+1] =mapAngleToRGB(asin(y), height) * scale;
        // pixels[index+2] = mapAngleToRGB(acos(x), width) * scale; 
        pixels[index+3] = 255;
    }
  }

  // var d = pixelDensity();

  updatePixels();
}

