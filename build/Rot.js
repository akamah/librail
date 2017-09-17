"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// expresses a point which can be a point of the coordinate system.
// we call this Rot45 coordinate.
// the values have no unit.
class Rot {
    constructor(a, b = 0, c = 0, d = 0) {
        this.a = a;
        this.b = b;
        this.c = c;
        this.d = d;
    }
    static zero() {
        return new this(0, 0, 0, 0);
    }
    static of(a, b = 0, c = 0, d = 0) {
        return new this(a, b, c, d);
    }
    toReal() {
        return [this.a + Math.SQRT1_2 * (this.b - this.d),
            this.c + Math.SQRT1_2 * (this.b + this.d)];
    }
    add(that) {
        return new Rot(this.a + that.a, this.b + that.b, this.c + that.c, this.d + that.d);
    }
    sub(that) {
        return this.add(that.neg());
    }
    neg() {
        return new Rot(-this.a, -this.b, -this.c, -this.d);
    }
    mul(that) {
        return new Rot(this.a * that.a - this.b * that.d - this.c * that.c - this.d * that.b, this.a * that.b + this.b * that.a - this.c * that.d - this.d * that.c, this.a * that.c + this.b * that.b + this.c * that.a - this.d * that.d, this.a * that.d + this.b * that.c + this.c * that.b + this.d * that.a);
    }
    equal(that) {
        return this.a === that.a &&
            this.b === that.b &&
            this.c === that.c &&
            this.d === that.d;
    }
}
exports.Rot = Rot;
