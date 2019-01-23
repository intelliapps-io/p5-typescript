"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var clock_1 = require("./clock");
var Sketch = (function () {
    function Sketch(p) {
        this.width = 200;
        this.p = p;
    }
    Sketch.prototype.setup = function () {
        var _a = this, p = _a.p, width = _a.width;
        p.createCanvas(width, width);
        this.clock = new clock_1.default(p, width - 20);
    };
    Sketch.prototype.draw = function () {
        var _a = this, p = _a.p, width = _a.width;
        p.translate(p.width / 2, 0);
        p.background(150);
        console.log("draw!");
    };
    return Sketch;
}());
var mySketch = new p5(function (p) {
    var sketch = new Sketch(p);
    p.setup = function () { return sketch.setup(); };
    p.draw = function () { return sketch.draw(); };
});
//# sourceMappingURL=sketch.js.map