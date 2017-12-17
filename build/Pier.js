"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Point_1 = require("./Point");
const Pole_1 = require("./Pole");
const End_1 = require("./End");
const Dir_1 = require("./Dir");
class Pier {
    constructor(at) {
        this.name = "pier";
        this.height = 4;
        this.origin = this.normalizeEnd(at);
    }
    normalizeEnd(e) {
        return new End_1.End(e.point, this.normalizeDir(e.dir), Pole_1.Pole.Plus);
    }
    normalizeDir(d) {
        return new Dir_1.Dir(d.dir % 4);
    }
}
exports.Pier = Pier;
class MiniPier extends Pier {
    constructor() {
        super(...arguments);
        this.name = "mini pier";
        this.height = 1;
    }
}
exports.MiniPier = MiniPier;
class CustomPier extends Pier {
    constructor(at, floors) {
        super(at);
        this.floors = floors;
        this.name = "CustomPier";
    }
    endWithReplacingUp(end, up) {
        let p = new Point_1.Point(this.origin.point.single, this.origin.point.double, up);
        return new End_1.End(p, this.origin.dir, this.origin.pole);
    }
    equivalentPiers() {
        var piers = [];
        var current = 0;
        this.floors.sort().forEach(n => {
            // n階層になるまで建て続ける
            for (; current + 4 <= n; current += 4) {
                let e = this.endWithReplacingUp(this.origin, current);
                piers.push(new Pier(e));
            }
            for (; current + 1 <= n; current += 1) {
                let e = this.endWithReplacingUp(this.origin, current);
                piers.push(new MiniPier(e));
            }
            // n階になった．
        });
        return piers;
    }
}
exports.CustomPier = CustomPier;
