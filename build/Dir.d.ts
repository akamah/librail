import { Rot } from './Rot';
/**
 * Dirの正面方向，つまり角度としての0度の方向は東側とする．
 * そのため，negで逆をとったら南北が反転するものとする．
 */
export declare class Dir {
    readonly dir: number;
    static readonly East: Dir;
    static readonly NorthEast: Dir;
    static readonly North: Dir;
    static readonly NorthWest: Dir;
    static readonly West: Dir;
    static readonly SouthWest: Dir;
    static readonly South: Dir;
    static readonly SouthEast: Dir;
    constructor(dir: number);
    match(a: Dir): boolean;
    opposite(): Dir;
    neg(): Dir;
    add(by: Dir): Dir;
    translateBy(by: Dir): Dir;
    flipVert(): Dir;
    toRot(): Rot;
}
