var sketch = (p: p5) => {

    const earth = new Earth();

    p.preload = () => {

    }
    
    p.setup = () => {
        p.createCanvas(p.windowWidth, p.windowHeight, p.WEBGL);
        earth.setup(p);
    }
    
    p.windowResized = () => {
        p.resizeCanvas(p.windowWidth, p.windowHeight);
    }
    
    p.draw = () => {
        p.background(100);
        earth.draw(p);
    }
}

var sketchP = new p5(sketch);