import { Apply } from './Apply';
import { Equal } from './Equal';
import { Rot } from './Rot';
export declare class Point implements Apply<Point, Point>, Equal<Point> {
    single: Rot;
    double: Rot;
    up: number;
    /**
     * @param single 単線
     * @param double 複線
     * @param up 段差，1はミニ橋脚の高さ，4はブロック橋脚の高さ
     */
    constructor(single: Rot, double: Rot, up?: number);
    static zero(): Point;
    static of(s: Rot, d?: Rot, u?: number): Point;
    add(other: Point): Point;
    sub(other: Point): Point;
    neg(): Point;
    apply(target: Point): Point;
    equal(other: Point): boolean;
    hasEffect(): boolean;
    isZero(): boolean;
}
