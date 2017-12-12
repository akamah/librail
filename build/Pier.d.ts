import { Point } from './Point';
import { Dir } from './Dir';
export declare class Pier {
    origin: Point;
    dir: Dir;
    name: string;
    height: number;
    constructor(origin: Point, dir: Dir);
}
export declare class MiniPier extends Pier {
    name: string;
    height: number;
}
