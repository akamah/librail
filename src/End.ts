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

    public match(other: End): Boolean {
        return this.point == other.point &&
            Dir.match(this.dir, other.dir) &&
            Pole.match(this.pole, other.pole);
    }

    public transformBy(global: End): End {
        const rotated = this.point.rotateBy(global.dir);
        const transformed = this.point.transformBy(global.point);

        return End.of(
            transformed,
            Dir.translateBy(this.dir, global.dir),
            Pole.translateBy(this.pole, global.pole));
    }

    // flip horizontally
    public invert(inverse = true): End {
        if (inverse) {
            return End.of(this.point.invert(inverse),
                          Dir.invert(this.dir, inverse),
                          this.pole)
        } else {
            return this
        }
    }
}
