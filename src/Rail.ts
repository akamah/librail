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

export abstract class Rail {
    constructor() {
    }

    protected abstract localEnds(): End[];
}

export class StraightRail extends Rail {
    static readonly Origin   = End.plus(Point.zero(), Dir.East);
    static readonly Straight = End.minus(Point.of(Rot.of(4)), Dir.West);
    
    constructor(
        public readonly origin: End,
        public readonly inverse: boolean // これは一般の場合で，直線の場合は無効となる
    ) {
        super();

        if (origin.pole.isMinus()) {
            const newOrigin = origin.apply(StraightRail.Straight);
            this.origin = newOrigin;
        } 
    }

    protected localEnds(): End[] {
        return [StraightRail.Origin, StraightRail.Straight];
    }

    // この部分はすべてのレールに共通なわけだ
    public ends(): End[] {
        return this.localEnds().map(e => {
            if (this.inverse) {
                return this.origin.apply(e.flipVert());
            } else {
                return this.origin.apply(e);
            }
        });
    }
}
