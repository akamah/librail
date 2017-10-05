import { Rot } from './Rot';
import { Dir } from './Dir';
export declare class Point {
    single: Rot;
    double: Rot;
    up: number;
    constructor(single: Rot, double: Rot, up?: number);
    static zero(): Point;
    static of(s: Rot, d?: Rot, u?: number): Point;
    add(other: Point): Point;
    neg(): Point;
    transformBy(global: Point): Point;
    rotateBy(dir: Dir): Point;
    invert(inverse?: boolean): Point;
}
