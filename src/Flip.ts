import { Apply } from './Apply'
import { Equal } from './Equal';

import { Dir } from './Dir';
import { Rot } from './Rot';
import { Point } from './Point';
import { End } from './End';


enum FlipEnum {
    No = 0,
    Yes
}

/**
 * Flip, 180度の回転を表す．回転軸は東西の線
 */
export class Flip implements Apply<Flip, Flip | Dir | Rot | Point | End>, Equal<Flip> {
    public static readonly No  = new Flip(FlipEnum.No);
    public static readonly Yes = new Flip(FlipEnum.Yes);

    public constructor(public readonly flip: number) {
        this.flip = flip % 2;
    }

    public apply(target: Flip): Flip;
    public apply(target: Dir): Dir;
    public apply(target: Rot): Rot;
    public apply(target: Point): Point;
    public apply(target: End): End;    
    public apply(target: Flip | Dir | Rot | Point | End): Flip | Dir | Rot | Point | End {
        if (target instanceof Flip) {
            return new Flip((this.flip + target.flip) % 2);
        } else if (target instanceof Dir) {
            return this.flipDir(target);
        } else if (target instanceof Rot) {
            return this.flipRot(target);
        } else if (target instanceof Point) {
            return this.flipPoint(target);
        } else {
            return this.flipEnd(target);
        }
    }

    public flipDir(target: Dir): Dir {
        return this.isYes() ? target.neg() : target;
    }

    public flipRot(target: Rot): Rot {
        return this.isYes() ? Rot.of(target.a, -target.d, -target.c, -target.b) : target;
    }

    public flipPoint(target: Point): Point {
        if (this.isYes()) {
            return Point.of(
                this.flipRot(target.single),
                this.flipRot(target.double),
                -target.up);
        } else {
            return target;
        }
    }

    public flipEnd(target: End): End {
        if (this.isYes()) {
            return End.of(
                this.flipPoint(target.point),
                this.flipDir(target.dir),
                target.pole);
            
        } else {
            return target;
        }
    }

    public hasEffect(): boolean {
        return this.flip === FlipEnum.Yes;
    }

    public equal(other: Flip): boolean {
        return this.flip === other.flip;
    }

    public isYes(): boolean {
        return this.flip === FlipEnum.Yes;
    }

    public opposite(): Flip {
        return new Flip((1 - this.flip) % 2);
    }
}
