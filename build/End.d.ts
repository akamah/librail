import { Point } from './Point';
import { Dir } from './Dir';
import { Pole } from './Pole';
import { Equal } from './Equal';
/**
 * レールの端点を表す．
 * 変換としては，回転を行ったのち平行移動を行う．
 */
export declare class End implements Equal<End> {
    readonly point: Point;
    readonly dir: Dir;
    readonly pole: Pole;
    constructor(point: Point, dir: Dir, pole: Pole);
    static of(point: Point, dir: Dir, pole: Pole): End;
    static plus(point: Point, dir: Dir): End;
    static minus(point: Point, dir: Dir): End;
    /**
     * 2つのレールの端点として見たとき，カチっとはまるかどうか
     * @param other もう片方の端点
     */
    match(other: End): boolean;
    opposite(): End;
    /**
     * thisが意味する座標変換を行う．つまり，ローカルからグローバル
     * @param target ローカル座標
     */
    apply(local: End): End;
    equal(other: End): boolean;
    valueOf(): string;
    toString(): string;
}
