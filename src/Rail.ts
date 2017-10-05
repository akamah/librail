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

// レールはどんどん継承して作っていくことにした
export abstract class Rail {
    constructor() {
    }

    protected abstract localEnds(): End[];
}

export class StraightRail extends Rail {
    constructor(
        public readonly origin: End,
        public readonly inverse: boolean
    ) {
        super();
    }

    protected localEnds(): End[] {
        return [
            End.minus(Point.zero(), Dir.West),
            End.plus(Point.of(Rot.of(4)), Dir.East)
        ];
    }

    public ends(): End[] {
        return this.localEnds().map(e =>
            e.invert(this.inverse).transformBy(this.origin)
        );
    }
}
