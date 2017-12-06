import { Point } from './Point';
import { Dir } from './Dir';
import { Pole } from './Pole';
import { Equal } from './Equal';
import { Apply } from './Apply'


/**
 * レールの端点を表す．
 * 変換としては，回転を行ったのち平行移動を行う．
 */
export class End implements Equal<End> {
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

    /**
     * 2つのレールの端点として見たとき，カチっとはまるかどうか
     * @param other もう片方の端点
     */
    public match(other: End): boolean {
        return this.equal(this.opposite());
    }

    public opposite(): End {
        return End.of(
            this.point,
            this.dir.opposite(),
            this.pole.opposite());
    }

    /**
     * thisが意味する座標変換を行う．つまり，ローカルからグローバル
     * @param target ローカル座標
     */
    public apply(local: End): End {
        return End.of(
            this.point.apply(this.dir.apply(local.point)),
            this.dir.apply(local.dir),
            this.pole.apply(local.pole));
    }

    public equal(other: End): boolean {
        return this.point.equal(other.point) &&
               this.dir.equal(other.dir) &&
               this.pole.equal(other.pole);
    }
}
