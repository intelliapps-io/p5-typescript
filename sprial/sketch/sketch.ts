var sketch = (p: p5) => {

    const draw = new Draw(p);
    
    p.setup = () => {
        p.createCanvas(p.windowWidth, p.windowHeight);
        draw.setup();
    }
    
    p.windowResized = () => {
        p.resizeCanvas(p.windowWidth, p.windowHeight);
    }
    
    p.draw = () => {
        draw.draw();
    }
}

var sketchP = new p5(sketch);