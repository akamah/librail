import { Apply } from './Apply';
import { Rot } from './Rot';
import { Dir } from './Dir';
export declare class Point implements Apply<Point, Point> {
    single: Rot;
    double: Rot;
    up: number;
    constructor(single: Rot, double: Rot, up?: number);
    static zero(): Point;
    static of(s: Rot, d?: Rot, u?: number): Point;
    add(other: Point): Point;
    neg(): Point;
    apply(target: Point): Point;
    invert(): Point;
    rotate(dir: Dir): Point;
    /**
     * flipVert rotates the point along X-axis by 180 degree.
     * so `this.up` will be negated.
     */
    flipVert(): Point;
}
