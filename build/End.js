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
    match(other) {
        return this.point == other.point &&
            this.dir.match(other.dir) &&
            this.pole.match(other.pole);
    }
    /**
     * thisが意味する座標変換を行う．つまり，ローカルからグローバル
     * @param target ローカル座標
     */
    apply(local) {
        return End.of(this.point.apply(this.dir.apply(local.point)), this.dir.apply(local.dir), this.pole.apply(local.pole));
    }
    // flip horizontally
    flipVert() {
        return End.of(this.point.flipVert(), this.dir.flipVert(), this.pole);
    }
}
exports.End = End;
