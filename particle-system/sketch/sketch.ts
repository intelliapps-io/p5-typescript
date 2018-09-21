var sketch = (p: p5) => {

    let particles: Array<Particle> = [];
    
    p.setup = () => {
        p.createCanvas(p.windowWidth, p.windowHeight);
        for(let i = 0; i < 5; i++) {
            particles.push(new Particle(p));
        }
    }
    
    p.draw = () => {
        p.clear();
        particles.forEach(particle => particle.draw(p));
    }
}

var sketchP = new p5(sketch);