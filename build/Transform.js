"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const End_1 = require("./End");
/**
 * ローカル座標を2つ指定することで，片方のローカル座標と重なるグローバル座標を，もう片方のローカル座標と重なるグローバル座標に変換する．
 */
class FromTo {
    constructor(from, to) {
        this.from = from;
        this.to = to;
    }
    /**
     *
     * @param global グローバル座標
     */
    apply(global) {
        // まず，ローカル座標の原点に対応するグローバル座標を作る．
        let d0 = global.dir.sub(this.from.dir);
        let p0 = global.point.sub(d0.apply(this.from.point));
        // 次に，行き先を構成する．
        let p = p0.add(d0.apply(this.to.point));
        let d = d0.add(this.to.dir);
        let pole = this.to.pole.apply(this.from.pole.apply(global.pole));
        return End_1.End.of(p, d, pole);
    }
    hasEffect() {
        return !(this.from.equal(this.to));
    }
}
exports.FromTo = FromTo;
