import { Rot } from './Rot';
import { Point } from './Point';
import { Apply } from './Apply';
import { Equal } from './Equal';
/**
 * Dirの正面方向，つまり角度としての0度の方向は東側とする．
 * そのため，negで逆をとったら南北が反転するものとする．
 */
export declare class Dir implements Apply<Dir, Dir | Rot | Point>, Equal<Dir> {
    readonly dir: number;
    static readonly East: Dir;
    static readonly NorthEast: Dir;
    static readonly North: Dir;
    static readonly NorthWest: Dir;
    static readonly West: Dir;
    static readonly SouthWest: Dir;
    static readonly South: Dir;
    static readonly SouthEast: Dir;
    private static readonly rotTable;
    constructor(dir: number);
    opposite(): Dir;
    add(by: Dir): Dir;
    sub(by: Dir): Dir;
    neg(): Dir;
    apply(target: Dir): Dir;
    apply(target: Rot): Rot;
    apply(target: Point): Point;
    hasEffect(): boolean;
    equal(other: Dir): boolean;
    flipVert(): Dir;
    toRot(): Rot;
    rotateRot(r: Rot): Rot;
    rotatePoint(p: Point): Point;
    valueOf(): string;
}
