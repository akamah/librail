// import { Vector3 } from 'three';
import { Rot } from './Rot';
import { Dir } from './Dir';


export class Point {
    // single: 単線, double: 複線
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

    public neg(): Point {
        return new Point(
            this.single.neg(),
            this.double.neg(),
            -this.up
        );
    }

    public transformBy(global: Point): Point {
        return this.add(global);
    }

    public rotateBy(dir: Dir): Point {
        return new Point(
            this.single.mul(dir.toRot()),
            this.double.mul(dir.toRot()),
            this.up
        );
    }

    /**
     * flipVert rotates the point along X-axis by 180 degree.
     * so `this.up` will be negated.
     */
    public flipVert(): Point {
        return Point.of(
                this.single.flipVert(),
                this.double.flipVert(),
                -this.up);
    }
}
