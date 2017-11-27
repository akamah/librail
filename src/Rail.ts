import { Rot } from './Rot'
import { Point } from './Point'
import { Pole } from './Pole'
import { End } from './End'
import { Dir } from './Dir'


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

// レールの種類によって共通した特徴をまとめたクラス
export abstract class Rail {
    abstract readonly name: string;
    abstract readonly localEnds: End[];

//    readonly canFlipVert: boolean;
//    readonly originPoles: Pole[]; /* 原点に使える極の種類, 例えば自動ターンアウトレールは凸のみ */

    abstract readonly flipped: boolean;
    abstract readonly origin: End;

    // この部分はすべてのレールに共通なわけだ
    public ends(): End[] {
        return this.localEnds.map(e => {
            if (this.flipped) {
                return this.origin.apply(e.flipVert());
            } else {
                return this.origin.apply(e);
            }
        });
    }
}


export class StraightRail extends Rail {
    static readonly Origin   = End.plus(Point.zero(), Dir.East);
    static readonly Straight = End.minus(Point.of(Rot.of(4)), Dir.West);
    
    name = "straight rail";
    localEnds = [StraightRail.Origin, StraightRail.Straight];

    constructor(
        public readonly origin: End,
        public readonly flipped: boolean
    ) {
        super();

        if (origin.pole.isMinus()) {
            const newOrigin = origin.apply(StraightRail.Straight);
            this.origin = newOrigin;
        }
    }
}

export interface RailConstructor {
    new(origin: End): Rail;
}
