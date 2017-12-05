"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Pole_1 = require("./Pole");
/**
 * レールの端点を表す．
 * 変換としては，回転を行ったのち平行移動を行う．
 */
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
    /**
     * 2つのレールの端点として見たとき，カチっとはまるかどうか
     * @param other もう片方の端点
     */
    match(other) {
        return this.point.equal(other.point) &&
            this.dir.equal(other.dir.opposite()) &&
            this.pole.equal(other.pole.opposite());
    }
    /**
     * thisが意味する座標変換を行う．つまり，ローカルからグローバル
     * @param target ローカル座標
     */
    apply(local) {
        return End.of(this.point.apply(this.dir.apply(local.point)), this.dir.apply(local.dir), this.pole.apply(local.pole));
    }
    equal(other) {
        return this.point.equal(other.point) &&
            this.dir.equal(other.dir) &&
            this.pole.equal(other.pole);
    }
}
exports.End = End;
