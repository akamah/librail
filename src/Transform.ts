import { Apply } from './Apply'
import { End } from './End'


/**
 * ローカル座標を2つ指定することで，片方のローカル座標と重なるグローバル座標を，もう片方のローカル座標と重なるグローバル座標に変換する．
 */
export class FromTo implements Apply<FromTo, End> {
    public constructor(public from: End, public to: End) {}

    /**
     * 
     * @param global グローバル座標
     */
    public apply(global: End): End {
        // まず，ローカル座標の原点に対応するグローバル座標を作る．
        let d0 = global.dir.sub(this.from.dir);
        let p0 = global.point.sub(d0.apply(this.from.point));

        // 次に，行き先を構成する．
        let p = p0.add(d0.apply(this.to.point));
        let d = d0.add(this.to.dir);

        let pole = this.to.pole.apply(this.from.pole.apply(global.pole));

        return End.of(p, d, pole);
    }

    public hasEffect(): boolean {
        return !(this.from.equal(this.to));
    }
}
