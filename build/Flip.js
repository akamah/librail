"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Dir_1 = require("./Dir");
const Rot_1 = require("./Rot");
const Point_1 = require("./Point");
const End_1 = require("./End");
var FlipEnum;
(function (FlipEnum) {
    FlipEnum[FlipEnum["No"] = 0] = "No";
    FlipEnum[FlipEnum["Yes"] = 1] = "Yes";
})(FlipEnum || (FlipEnum = {}));
/**
 * Flip, 180度の回転を表す．回転軸は東西の線
 */
class Flip {
    constructor(flip) {
        this.flip = flip;
        this.flip = flip % 2;
    }
    apply(target) {
        if (target instanceof Flip) {
            return new Flip((this.flip + target.flip) % 2);
        }
        else if (target instanceof Dir_1.Dir) {
            return this.flipDir(target);
        }
        else if (target instanceof Rot_1.Rot) {
            return this.flipRot(target);
        }
        else if (target instanceof Point_1.Point) {
            return this.flipPoint(target);
        }
        else {
            return this.flipEnd(target);
        }
    }
    flipDir(target) {
        return this.isYes() ? target.neg() : target;
    }
    flipRot(target) {
        return this.isYes() ? Rot_1.Rot.of(target.a, -target.d, -target.c, -target.b) : target;
    }
    flipPoint(target) {
        if (this.isYes()) {
            return Point_1.Point.of(this.flipRot(target.single), this.flipRot(target.double), -target.up);
        }
        else {
            return target;
        }
    }
    flipEnd(target) {
        if (this.isYes()) {
            return End_1.End.of(this.flipPoint(target.point), this.flipDir(target.dir), target.pole);
        }
        else {
            return target;
        }
    }
    hasEffect() {
        return this.flip === FlipEnum.Yes;
    }
    equal(other) {
        return this.flip === other.flip;
    }
    isYes() {
        return this.flip === FlipEnum.Yes;
    }
    opposite() {
        return new Flip((1 - this.flip) % 2);
    }
    valueOf() {
        return this.flip.toString();
    }
}
Flip.No = new Flip(FlipEnum.No);
Flip.Yes = new Flip(FlipEnum.Yes);
exports.Flip = Flip;
