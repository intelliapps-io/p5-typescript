var Sketch = (function () {
    function Sketch(p) {
        this.width = 300;
        this.p = p;
    }
    Sketch.prototype.setup = function () {
        var _a = this, p = _a.p, width = _a.width;
        p.createCanvas(width, width);
        p.angleMode("RADIANS");
        this.clock = new Clock(p);
    };
    Sketch.prototype.draw = function () {
        var p = this.p;
        p.translate(p.width / 2, p.height / 2);
        this.clock.draw();
    };
    return Sketch;
}());
var mySketch = new p5(function (p) {
    var sketch = new Sketch(p);
    p.setup = function () { return sketch.setup(); };
    p.draw = function () { return sketch.draw(); };
});
var Clock = (function () {
    function Clock(p) {
        this.p = p;
    }
    Clock.prototype.setup = function () {
    };
    Clock.prototype.drawDuration = function (minuets) {
        var p = this.p;
    };
    Clock.prototype.drawHourTicks = function (length) {
        var p = this.p;
        p.stroke(150, 150, 150);
        p.strokeWeight(2);
        for (var i = 0; i < 12; i++) {
            var angle = (p.TWO_PI / 12) * i;
            var center = p.createVector(0, 0);
            var radius = (p.width / 2) - 5;
            var x1 = p.cos(angle) * radius;
            var y1 = p.sin(angle) * radius;
            var x2 = p.cos(angle) * (radius - length);
            var y2 = p.sin(angle) * (radius - length);
            p.line(x1, y1, x2, y2);
        }
    };
    Clock.prototype.draw = function () {
        var p = this.p;
        var width = p.width;
        p.fill(240, 240, 240);
        p.stroke(150, 150, 150);
        p.strokeWeight(2);
        p.ellipse(0, 0, width - 10, width - 10);
        this.drawHourTicks(10);
    };
    return Clock;
}());
//# sourceMappingURL=build.js.map