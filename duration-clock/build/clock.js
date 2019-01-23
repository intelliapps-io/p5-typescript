"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Clock = (function () {
    function Clock(p, width) {
        this.p = p;
        this.width = width;
    }
    Clock.prototype.setup = function () {
    };
    Clock.prototype.draw = function () {
        var _a = this, p = _a.p, width = _a.width;
        p.fill(0, 0, 0);
        p.ellipse(0, width / 2, width, width);
        console.log("draw!");
    };
    return Clock;
}());
exports.default = Clock;
//# sourceMappingURL=clock.js.map