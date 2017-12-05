import { Apply } from './Apply';
import { Equal } from './Equal';
import { Rot } from './Rot';


export class Point implements Apply<Point, Point>, Equal<Point> {
    /**
     * @param single 単線
     * @param double 複線
     * @param up 段差，1はミニ橋脚の高さ，4はブロック橋脚の高さ
     */
    public constructor(public single: Rot, public double: Rot, public up = 0) {}

    public static zero() {
        return new Point(Rot.zero(), Rot.zero(), 0);
    }

    public static of(s: Rot, d = Rot.zero(), u = 0) {
        return new Point(s, d, u);
    }

    // blenderの世界からthree.jsの世界のベクトルに移す
    // なのでx軸周りで回転している
/*
    public toVector3(): Vector3 {
        const SINGLE = 54;
        const DOUBLE = 60;
        const HEIGHT = 66 / 4;

        const [sx, sy] = this.single.toReal();
        const [dx, dy] = this.double.toReal();

        return new Vector3(
            SINGLE * sx + DOUBLE * dx,
            HEIGHT * this.up,
            -(SINGLE * sy + DOUBLE * dy)
        )
    }
*/
    public add(other: Point): Point {
        return new Point(
            this.single.add(other.single),
            this.double.add(other.double),
            this.up + other.up);
    }

    public sub(other: Point): Point {
        return this.add(other.neg());
    }

    public neg(): Point {
        return new Point(
            this.single.neg(),
            this.double.neg(),
            -this.up
        );
    }

    public apply(target: Point): Point {
        return this.add(target);
    }

    public equal(other: Point): boolean {
        return this.single.equal(other.single) &&
               this.double.equal(other.double) &&
               this.up === other.up;
    }

    public hasEffect(): boolean {
        return !this.isZero();
    }

    public isZero(): boolean {
        return this.single.isZero() && this.double.isZero() && this.up === 0;
    }
}
