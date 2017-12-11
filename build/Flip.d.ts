import { Apply } from './Apply';
import { Equal } from './Equal';
import { Dir } from './Dir';
import { Rot } from './Rot';
import { Point } from './Point';
import { End } from './End';
/**
 * Flip, 180度の回転を表す．回転軸は東西の線
 */
export declare class Flip implements Apply<Flip, Flip | Dir | Rot | Point | End>, Equal<Flip> {
    readonly flip: number;
    static readonly No: Flip;
    static readonly Yes: Flip;
    constructor(flip: number);
    apply(target: Flip): Flip;
    apply(target: Dir): Dir;
    apply(target: Rot): Rot;
    apply(target: Point): Point;
    apply(target: End): End;
    flipDir(target: Dir): Dir;
    flipRot(target: Rot): Rot;
    flipPoint(target: Point): Point;
    flipEnd(target: End): End;
    hasEffect(): boolean;
    equal(other: Flip): boolean;
    isYes(): boolean;
    opposite(): Flip;
    valueOf(): string;
}
