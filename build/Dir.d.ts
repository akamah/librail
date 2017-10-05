import { Rot } from './Rot';
export declare enum Dir {
    East = 0,
    NorthEast = 1,
    North = 2,
    NorthWest = 3,
    West = 4,
    SouthWest = 5,
    South = 6,
    SouthEast = 7,
}
export declare namespace Dir {
    function match(a: Dir, b: Dir): boolean;
    function opposite(a: Dir): Dir;
    function neg(a: Dir): Dir;
    function rotate(target: Dir, by: Dir): Dir;
    function translateBy(target: Dir, by: Dir): Dir;
    function invert(target: Dir, inverse?: boolean): Dir;
    function toRot(target: Dir): Rot;
}
