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

export abstract class RailFactory {
    abstract name: string; // this string can be a key or object property
    abstract localEnds: End[]; // [0] should be origin

    abstract canFlip: Meaning;
    abstract hasPole: Meaning;

    /**
     * このメソッドでは，端点termを指定された場合は，原点の座標に戻してインスタンスを作る．
     * @param term a valid index of localEnds.
     * @param origin origin
     * @param flip isFlipped
     */
    public create(term: number, termEnd: End, flip: Flip): RailInstance {
        let origin = this.convert(term, 0, termEnd, flip);
        return { origin: origin, flip: flip };
    }

    public convert(from: number, to: number, end: End, flip: Flip): End {
        let oEnd = flip.apply(this.localEnds[from]);
        let tEnd = flip.apply(this.localEnds[to]);

        let fromto = new FromTo(tEnd, oEnd);
        let origin = fromto.apply(end);

        return origin;
    }

    public canCreate(term: number, origin: End, flip: Flip): boolean {
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

     // この部分はすべてのレールに共通なわけだ
    public ends(): End[] {
        return this.factory.localEnds.map(e => {
            return this.instance.origin.apply(this.instance.flip.apply(e));
        });
    }
}


export class StraightRailFactory extends RailFactory {
    readonly O = End.plus(Point.zero(), Dir.East);
    readonly S = End.minus(Point.of(Rot.of(4)), Dir.West);
    
    public name = "1/1 straight";
    public localEnds = [this.O, this.S];
    public canFlip = Meaning.DontCare;
    public hasPole = Meaning.DontCare;

    public create(term: number, origin: End, flip: Flip) {
        let { origin: o, flip: f } = super.create(term, origin, flip);

        // 重複が発生するため処理する．
        if (o.pole.isMinus()) {
            let newOrigin = this.convert(0, 1, o, f);
            return { origin: newOrigin, flip: Flip.No };
        } else {
            return { origin: o, flip: Flip.No };
        }
    }
}

export const Straight = new StraightRailFactory();

export class CurveRailFactory extends RailFactory {
    readonly O = End.plus(Point.zero(), Dir.East);
    readonly C = End.minus(Point.of(Rot.of(0, 0, 4, -4)), Dir.SouthWest);
    
    public name = "1/8 curve";
    public localEnds = [this.O, this.C];
    public canFlip = Meaning.DontCare;
    public hasPole = Meaning.DontCare;

    public create(term: number, origin: End, flip: Flip) {
        let { origin: o, flip: f } = super.create(term, origin, flip);

        // 重複が発生する．
        if (o.pole.isMinus()) {
            let newOrigin = this.convert(0, 1, o, f)
            return { origin: newOrigin, flip: f.opposite() };
        } else {
            return { origin: o, flip: f };
        }
    }
}

export const Curve = new CurveRailFactory();


export class SlopeRailFactory extends RailFactory {
    readonly O = End.plus(Point.zero(), Dir.East);
    readonly S = End.minus(Point.of(Rot.of(8), Rot.of(0), 4), Dir.West);
    
    public name = "slope";
    public localEnds = [this.O, this.S];
    public canFlip = Meaning.Meaningful;
    public hasPole = Meaning.DontCare;

    public create(term: number, origin: End, flip: Flip) {
        let { origin: o, flip: f } = super.create(term, origin, flip);

        // 重複が発生するため処理する．
        if (o.pole.isMinus()) {
            let newOrigin = this.convert(0, 1, o, f);
            return { origin: newOrigin, flip: f.opposite() };
        } else {
            return { origin: o, flip: f };
        }
    }
}

export const Slope = new SlopeRailFactory();
