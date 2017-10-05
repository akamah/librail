"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// import { Vector3 } from 'three';
const Rot_1 = require("./Rot");
const Dir_1 = require("./Dir");
class Point {
    // single: 単線, double: 複線
    constructor(single, double, up = 0) {
        this.single = single;
        this.double = double;
        this.up = up;
    }
    static zero() {
        return new Point(Rot_1.Rot.zero(), Rot_1.Rot.zero(), 0);
    }
    static of(s, d = Rot_1.Rot.zero(), u = 0) {
        return new Point(s, d, u);
    }
    // blenderの世界からthree.jsの世界のベクトルに移す
    // なのでx軸周りで回転している
    /*
        public toVector3(): Vector3 {
            const SINGLE = 54;
            const DOUBLE = 60;
            const HEIGHT = 66 / 4;
    
            const [sx, sy] = this.single.toReal();
            const [dx, dy] = this.double.toReal();
    
            return new Vector3(
                SINGLE * sx + DOUBLE * dx,
                HEIGHT * this.up,
                -(SINGLE * sy + DOUBLE * dy)
            )
        }
    */
    add(other) {
        return new Point(this.single.add(other.single), this.double.add(other.double), this.up + other.up);
    }
    neg() {
        return new Point(this.single.neg(), this.double.neg(), -this.up);
    }
    transformBy(global) {
        return this.add(global);
    }
    rotateBy(dir) {
        return new Point(this.single.mul(Dir_1.Dir.toRot(dir)), this.double.mul(Dir_1.Dir.toRot(dir)), this.up);
    }
    invert(inverse = true) {
        if (inverse) {
            return Point.of(this.single.invert(inverse), this.double.invert(inverse), -this.up);
        }
        else {
            return this;
        }
    }
}
exports.Point = Point;
