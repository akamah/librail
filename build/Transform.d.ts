import { Apply } from './Apply';
import { End } from './End';
/**
 * ローカル座標を2つ指定することで，片方のローカル座標と重なるグローバル座標を，もう片方のローカル座標と重なるグローバル座標に変換する．
 */
export declare class FromTo implements Apply<FromTo, End> {
    from: End;
    to: End;
    constructor(from: End, to: End);
    /**
     *
     * @param global グローバル座標
     */
    apply(global: End): End;
    hasEffect(): boolean;
}
