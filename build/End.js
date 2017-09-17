"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Dir_1 = require("./Dir");
const Pole_1 = require("./Pole");
class End {
    constructor(point, dir, pole) {
        this.point = point;
        this.dir = dir;
        this.pole = pole;
    }
    static of(point, dir, pole) {
        return new this(point, dir, pole);
    }
    static plus(point, dir) {
        return new this(point, dir, Pole_1.Pole.Plus);
    }
    static minus(point, dir) {
        return new this(point, dir, Pole_1.Pole.Minus);
    }
    match(other) {
        return this.point == other.point &&
            Dir_1.Dir.match(this.dir, other.dir) &&
            Pole_1.Pole.match(this.pole, other.pole);
    }
    transformBy(global) {
        const rotated = this.point.rotateBy(global.dir);
        const transformed = this.point.transformBy(global.point);
        return End.of(transformed, Dir_1.Dir.translateBy(this.dir, global.dir), Pole_1.Pole.translateBy(this.pole, global.pole));
    }
}
exports.End = End;
