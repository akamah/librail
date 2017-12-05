"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Rot_1 = require("./Rot");
class Point {
    /**
     * @param single 単線
     * @param double 複線
     * @param up 段差，1はミニ橋脚の高さ，4はブロック橋脚の高さ
     */
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
    sub(other) {
        return this.add(other.neg());
    }
    neg() {
        return new Point(this.single.neg(), this.double.neg(), -this.up);
    }
    apply(target) {
        return this.add(target);
    }
    equal(other) {
        return this.single.equal(other.single) &&
            this.double.equal(other.double) &&
            this.up === other.up;
    }
    hasEffect() {
        return !this.isZero();
    }
    isZero() {
        return this.single.isZero() && this.double.isZero() && this.up === 0;
    }
}
exports.Point = Point;
