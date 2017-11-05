"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
            this.dir.match(other.dir) &&
            this.pole.match(other.pole);
    }
    transformBy(global) {
        const rotated = this.point.rotateBy(global.dir);
        const transformed = rotated.transformBy(global.point);
        return End.of(transformed, this.dir.translateBy(global.dir), this.pole.translateBy(global.pole));
    }
    // flip horizontally
    invert(inverse = true) {
        if (inverse) {
            return End.of(this.point.invert(inverse), this.dir.invert(inverse), this.pole);
        }
        else {
            return this;
        }
    }
}
exports.End = End;
