import { Point } from './Point';
import { Dir } from './Dir';
import { Pole } from './Pole';
export declare class End {
    readonly point: Point;
    readonly dir: Dir;
    readonly pole: Pole;
    constructor(point: Point, dir: Dir, pole: Pole);
    static of(point: Point, dir: Dir, pole: Pole): End;
    static plus(point: Point, dir: Dir): End;
    static minus(point: Point, dir: Dir): End;
    match(other: End): boolean;
    transformBy(global: End): End;
    flipVert(): End;
}
