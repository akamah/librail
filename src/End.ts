import { Point } from './Point';
import { Dir } from './Dir';
import { Pole } from './Pole';

export class End {
    public constructor(
        public readonly point: Point,
        public readonly dir: Dir,
        public readonly pole: Pole
    ) {}

    public static of(point: Point, dir: Dir, pole: Pole) {
        return new this(point, dir, pole);
    }

    public static plus(point: Point, dir: Dir) {
        return new this(point, dir, Pole.Plus);
    }

    public static minus(point: Point, dir: Dir) {
        return new this(point, dir, Pole.Minus);
    }

    public match(other: End): boolean {
        return this.point == other.point &&
            this.dir.match(other.dir) &&
            Pole.match(this.pole, other.pole);
    }

    public transformBy(global: End): End {
        const rotated = this.point.rotateBy(global.dir);
        const transformed = rotated.transformBy(global.point);

        return End.of(
            transformed,
            this.dir.translateBy(global.dir),
            Pole.translateBy(this.pole, global.pole));
    }

    // flip horizontally
    public invert(inverse = true): End {
        if (inverse) {
            return End.of(this.point.invert(inverse),
                          this.dir.invert(inverse),
                          this.pole)
        } else {
            return this
        }
    }
}
