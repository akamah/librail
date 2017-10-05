"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Rot_1 = require("./Rot");
const Point_1 = require("./Point");
const End_1 = require("./End");
const Dir_1 = require("./Dir");
// # レールの種類ごとに共通した特徴
// * 端点の(位置)と(凹凸)と(方向)
// * 状態数
// * 状態に対応してオンになるモデルの名前
// * 端点から端点に移動した時の状態遷移関数
// * 端点から端点に移動する時のベクトル関数、導関数
// * 
// レールはどんどん継承して作っていくことにした
class Rail {
    constructor() {
    }
}
exports.Rail = Rail;
class StraightRail extends Rail {
    constructor(origin, inverse) {
        super();
        this.origin = origin;
        this.inverse = inverse;
    }
    localEnds() {
        return [
            End_1.End.minus(Point_1.Point.zero(), Dir_1.Dir.West),
            End_1.End.plus(Point_1.Point.of(Rot_1.Rot.of(4)), Dir_1.Dir.East)
        ];
    }
    ends() {
        return this.localEnds().map(e => e.invert(this.inverse).transformBy(this.origin));
    }
}
exports.StraightRail = StraightRail;
