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
/* 問題：
* レールの種類ごとに一意性を判定する部分が微妙に異なる
* 端点に名前をつけるべきか？

*/
// レールはどんどん継承して作っていくことにした
/* レールのローカルから見た端点の方向は，外側に向かう方向とする．
 * 例えば，原点から東においた直線レールの場合，
 * 原点の方の端の方向は西で，a = 1の部分の方向は東となる．
 *

 */
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
    // この部分はすべてのレールに共通なわけだ
    ends() {
        return this.localEnds().map(e => {
            if (this.inverse) {
                return e.flipVert().transformBy(this.origin);
            }
            else {
                return e.transformBy(this.origin);
            }
        });
    }
}
StraightRail.STRAIGHT = End_1.End.plus(Point_1.Point.of(Rot_1.Rot.of(4)), Dir_1.Dir.East);
exports.StraightRail = StraightRail;
