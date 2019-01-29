var Sketch = (function () {
    function Sketch(p) {
        this.p = p;
    }
    Sketch.prototype.setup = function () {
        var p = this.p;
        p.createCanvas(p.windowWidth, p.windowHeight);
    };
    Sketch.prototype.draw = function () {
        var p = this.p;
        p.translate(p.width / 2, 0);
        p.background(150);
    };
    return Sketch;
}());
var mySketch = new p5(function (p) {
    var sketch = new Sketch(p);
    p.setup = function () { return sketch.setup(); };
    p.draw = function () { return sketch.draw(); };
});
//# sourceMappingURL=build.js.map