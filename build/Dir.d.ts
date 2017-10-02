import { Rot } from './Rot';
export declare enum Dir {
    North = 0,
    NorthWest = 1,
    West = 2,
    SouthWest = 3,
    South = 4,
    SouthEast = 5,
    East = 6,
    NorthEast = 7,
}
export declare namespace Dir {
    function match(a: Dir, b: Dir): boolean;
    function opposite(a: Dir): Dir;
    function neg(a: Dir): Dir;
    function rotate(target: Dir, by: Dir): Dir;
    function translateBy(target: Dir, by: Dir): Dir;
    function toRot(target: Dir): Rot;
}
