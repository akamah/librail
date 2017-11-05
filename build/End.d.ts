import { Point } from './Point';
import { Dir } from './Dir';
import { Pole } from './Pole';
/**
 * レールの端点を表す．
 * 変換としては，回転を行ったのち平行移動を行う．
 */
export declare class End {
    readonly point: Point;
    readonly dir: Dir;
    readonly pole: Pole;
    constructor(point: Point, dir: Dir, pole: Pole);
    static of(point: Point, dir: Dir, pole: Pole): End;
    static plus(point: Point, dir: Dir): End;
    static minus(point: Point, dir: Dir): End;
    match(other: End): boolean;
    /**
     * thisが意味する座標変換を行う．つまり，ローカルからグローバル
     * @param target ローカル座標
     */
    apply(local: End): End;
    flipVert(): End;
}
