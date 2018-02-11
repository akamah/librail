import { Rot } from './Rot'
import { Point } from './Point'
import { Pole } from './Pole'
import { End } from './End'
import { Dir } from './Dir'
import { Flip } from './Flip'
import { FromTo } from './Transform'


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

export enum Meaning {
    Impossible = 0,
    DontCare = 1,
    Meaningful = 2
}

export type RailInstance = {
    origin: End,
    flip:   Flip
};

export class RailFactory {
// this string can be a key or object property
 // [0] should be origin

    // canFlip is Impossible => Flip.No only
    //            DontCare => flip will be Flip.No, but one can specify Flip.Yes
    //            Meaningful => set to given parameter

    // hasPole is Impossible => origin's pole must be Pole.Plus
    //            DontCare => will be normalized to Pole.Plus, by flipping and
    //                        setting the origin to other end,
    //                        therefore localEnds should have exact 2 elems
    //            Meaningful => meaningful

    /**
     * 
     * @param name unique identifier among the rails
     * @param localEnds [0] should be the origin
     * @param canFlip Impossible => Flip.No only
     *                DontCare => flip will be Flip.No, but one can specify Flip.Yes
     *                Meaningful => set to given parameter
     * @param hasPole Impossible => origin's pole must be Pole.Plus
     *                DontCare => will be normalized to Pole.Plus, by flipping and
     *                            setting the origin to other end,
     *                            therefore localEnds should have exact 2 elems
     *                Meaningful => meaningful
     * @param localPierPoints an point to set a pier, pole will be ignored
     */
    public constructor(
        public name: String,
        public localEnds: End[],       
        public canFlip: Meaning,
        public hasPole: Meaning,
        public localPierEnds = localEnds) {
    }
    
    /**
     * このメソッドでは，端点termを指定された場合は，原点の座標に戻してインスタンスを作る．
     * @param term a valid index of localEnds.
     * @param origin origin
     * @param flip isFlipped
     */
    public create(term: number, termEnd: End, flip: Flip): RailInstance {
        var o = this.convert(term, 0, termEnd, flip);
        var f = flip;

        // 重複が発生するため処理する．
        if (o.pole.isMinus()) {
            if (this.hasPole === Meaning.Meaningful) {
                // 正規化の余地なし
            } else if (this.hasPole === Meaning.DontCare) {
                // もう片方の端点を原点として作り直す
                o = this.convert(0, 1, o, f);
                f = f.opposite();
            } else { // hasPole is Impossible
                throw "this kind of rail can't have minus-pole origin";
            }
        }

        // normalize flip
        if (f.isYes()) {
            if (this.canFlip === Meaning.Meaningful) {
                // proceed
            } else if (this.canFlip === Meaning.DontCare) {
                f = Flip.No;
            } else { // canFlip is Impossible
                throw "this kind of rail can't be flipped";
            }
        } 

        return { origin: o, flip: f };
    }

    public convert(from: number, to: number, end: End, flip: Flip): End {
        let oEnd = flip.apply(this.localEnds[from]);
        let tEnd = flip.apply(this.localEnds[to]);

        let fromto = new FromTo(tEnd, oEnd);
        let origin = fromto.apply(end);

        return origin;
    }

    public canCreate(term: number, origin_: End, flip: Flip): boolean {
        let origin = this.convert(term, 0, origin_, flip);
        if (term < 0 || this.localEnds.length <= term ) {
            return false;
        } else if (this.canFlip === Meaning.Impossible && flip.hasEffect()) {
            return false;
        } else if (this.hasPole === Meaning.Impossible && origin.pole.hasEffect()) {
            return false;
        } else {
            return true;
        }
    }
}

export class Rail {
    public instance: RailInstance;
    public constructor(public factory: RailFactory, term: number, origin: End, flip: Flip) {
        this.instance = factory.create(term, origin, flip);
    }

    public localToGlobal(local: End): End {
        return this.instance.origin.apply(this.instance.flip.apply(local));
    }

    public ends(): End[] {
        return this.factory.localEnds.map(e => this.localToGlobal(e));
    }

    public pierPoints(): End[] {
        return this.factory.localPierEnds.map(e => this.localToGlobal(e));        
    }

    public toString(): string {
        return this.valueOf();
    }

    public valueOf(): string {
        return `${this.factory.name}(${this.instance.origin.valueOf()},${this.instance.flip.valueOf()})`;
    }
}


let origin    = End.plus(Point.zero(), Dir.East);
let straight1 = End.minus(Point.of(Rot.of(1)), Dir.West);
let straight2 = End.minus(Point.of(Rot.of(2)), Dir.West);
let straight4 = End.minus(Point.of(Rot.of(4)), Dir.West);
let straight6 = End.minus(Point.of(Rot.of(6)), Dir.West);
let straight8 = End.minus(Point.of(Rot.of(8)), Dir.West);
let straight4_slope = End.minus(Point.of(Rot.of(4), Rot.zero(), 1), Dir.West);
let straight8_slope = End.minus(Point.of(Rot.of(8), Rot.zero(), 4), Dir.West);

let curve4_8  = End.minus(Point.of(Rot.of(0, 0, 4, -4)), Dir.SouthWest);
let curve6_8  = End.minus(Point.of(Rot.of(2, 0, 4, -4)), Dir.SouthWest);
let curve4_4  = End.minus(Point.of(Rot.of(4, 4, 0, 0)), Dir.South);


export const Straight = new RailFactory(
    "straight_1",
    [origin, straight4],
    Meaning.DontCare,
    Meaning.DontCare
);


export const Curve = new RailFactory(
    "curve_8",
    [origin, curve4_8],
    Meaning.Meaningful,
    Meaning.DontCare
);


export const Slope = new RailFactory(
    "slope",
    [origin, straight8_slope],
    Meaning.Meaningful,
    Meaning.DontCare
);

export const Turnout = new RailFactory(
    "turnout",
    [origin, straight4, curve4_8],
    Meaning.Meaningful,
    Meaning.Meaningful
);

