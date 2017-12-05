"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Rot_1 = require("./Rot");
const Point_1 = require("./Point");
const End_1 = require("./End");
const Dir_1 = require("./Dir");
const Flip_1 = require("./Flip");
const Transform_1 = require("./Transform");
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
/* レールのローカルから見た端点の方向は，内側に向かう方向とする．
 * 例えば，原点から東においた直線レールの場合，
 * 原点の方の端の方向は東で，a = 1の部分の方向は西となる．
 * こうすることで，原点でのローカルとグローバルのギャップがなくなり，座標変換が素直に対応する．
 *

 */
var Meaning;
(function (Meaning) {
    Meaning[Meaning["Impossible"] = 0] = "Impossible";
    Meaning[Meaning["DontCare"] = 1] = "DontCare";
    Meaning[Meaning["Meaingful"] = 2] = "Meaingful";
})(Meaning = exports.Meaning || (exports.Meaning = {}));
class RailFactory {
    /**
     * このメソッドでは，端点termを指定された場合は，原点の座標に戻してインスタンスを作る．
     * @param term a valid index of localEnds.
     * @param origin origin
     * @param flip isFlipped
     */
    create(term, termEnd, flip) {
        let origin = this.convert(term, 0, termEnd, flip);
        return { origin: origin, flip: flip };
    }
    convert(from, to, end, flip) {
        let oEnd = flip.apply(this.localEnds[from]);
        let tEnd = flip.apply(this.localEnds[to]);
        let fromto = new Transform_1.FromTo(tEnd, oEnd);
        let origin = fromto.apply(end);
        return origin;
    }
    canCreate(term, origin, flip) {
        if (term < 0 || this.localEnds.length <= term) {
            return false;
        }
        else if (this.canFlip === Meaning.Impossible && flip.hasEffect()) {
            return false;
        }
        else if (this.hasPole === Meaning.Impossible && origin.pole.hasEffect()) {
            return false;
        }
        else {
            return true;
        }
    }
}
exports.RailFactory = RailFactory;
class Rail {
    constructor(factory, term, origin, flip) {
        this.factory = factory;
        this.instance = factory.create(term, origin, flip);
    }
    // この部分はすべてのレールに共通なわけだ
    ends() {
        return this.factory.localEnds.map(e => {
            return this.instance.origin.apply(this.instance.flip.apply(e));
        });
    }
}
exports.Rail = Rail;
class StraightRailFactory extends RailFactory {
    constructor() {
        super(...arguments);
        this.O = End_1.End.plus(Point_1.Point.zero(), Dir_1.Dir.East);
        this.S = End_1.End.minus(Point_1.Point.of(Rot_1.Rot.of(4)), Dir_1.Dir.West);
        this.name = "1/1 straight";
        this.localEnds = [this.O, this.S];
        this.canFlip = Meaning.DontCare;
        this.hasPole = Meaning.DontCare;
    }
    create(term, origin, flip) {
        let { origin: o, flip: f } = super.create(term, origin, flip);
        // 重複が発生するため処理する．
        if (o.pole.isMinus()) {
            let newOrigin = this.convert(0, 1, o, f);
            return { origin: newOrigin, flip: Flip_1.Flip.No };
        }
        else {
            return { origin: o, flip: Flip_1.Flip.No };
        }
    }
}
exports.StraightRailFactory = StraightRailFactory;
exports.Straight = new StraightRailFactory();
class CurveRailFactory extends RailFactory {
    constructor() {
        super(...arguments);
        this.O = End_1.End.plus(Point_1.Point.zero(), Dir_1.Dir.East);
        this.C = End_1.End.minus(Point_1.Point.of(Rot_1.Rot.of(0, 0, 4, -4)), Dir_1.Dir.SouthWest);
        this.name = "1/8 curve";
        this.localEnds = [this.O, this.C];
        this.canFlip = Meaning.DontCare;
        this.hasPole = Meaning.DontCare;
    }
    create(term, origin, flip) {
        let { origin: o, flip: f } = super.create(term, origin, flip);
        // 重複が発生する．
        if (o.pole.isMinus()) {
            let newOrigin = this.convert(0, 1, o, f);
            return { origin: newOrigin, flip: f.opposite() };
        }
        else {
            return { origin: o, flip: f };
        }
    }
}
exports.CurveRailFactory = CurveRailFactory;
exports.Curve = new CurveRailFactory();
