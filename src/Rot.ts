import { Apply } from './Apply'
import { Equal } from './Equal'

/**
 * Expresses a point in the `Rot45' coordinate system.
 * Rot45 has four basis vectors (➡️, ↗️, ⬆️, ↖️), and its coeffcients are integers.
 * the values have no unit.
 */
export class Rot implements Apply<Rot, Rot>, Equal<Rot> {
    public constructor(
        public readonly a: number,
        public readonly b = 0, 
        public readonly c = 0,
        public readonly d = 0) {
    }

    public static zero(): Rot {
        return new this(0, 0, 0, 0);
    }

    public static of(a: number, b = 0, c = 0, d = 0): Rot {
        return new this(a, b, c, d);
    }

    public toReal(): [number, number] {
        return [this.a + Math.SQRT1_2 * (this.b - this.d),
                this.c + Math.SQRT1_2 * (this.b + this.d)];
    }

    public add(that: Rot): Rot {
        return new Rot(
            this.a + that.a, this.b + that.b,
            this.c + that.c, this.d + that.d);
    }

    public sub(that: Rot): Rot {
        return this.add(that.neg());
    }

    /**
     * negate the point, rotate 180 degree around the origin
     */
    public neg(): Rot {
        return new Rot(-this.a, -this.b, -this.c, -this.d);
    }

    public mul(that: Rot): Rot {
        return new Rot(
            this.a*that.a - this.b*that.d - this.c*that.c - this.d*that.b,
            this.a*that.b + this.b*that.a - this.c*that.d - this.d*that.c,
            this.a*that.c + this.b*that.b + this.c*that.a - this.d*that.d,
            this.a*that.d + this.b*that.c + this.c*that.b + this.d*that.a,
        );
    }

    /**
     * apply transform operation
     * @param target the operand
     */
    public apply(target: Rot): Rot {
        return this.add(target);
    }

    public hasEffect(): boolean {
        return !this.isZero();
    }

    public isZero(): boolean {
        return this.a === 0 && this.b === 0 && this.c === 0 && this.d === 0;
    }

    public equal(other: Rot): boolean {
        return this.a === other.a &&
               this.b === other.b &&
               this.c === other.c &&
               this.d === other.d;
    }

    private stringifyWithSign(n: number): string {
        if (n < 0) {
            return n.toString();
        } else {
            return "+" + n.toString();
        }
    }

    public valueOf(): string {
        var s = this.a.toString();

        if (this.b === 0 && this.c === 0 && this.d === 0) {
            return s;
        }
        s += this.stringifyWithSign(this.b);

        if (this.c === 0 && this.d === 0) {
            return s;
        }
        s += this.stringifyWithSign(this.c);
        
        if (this.d === 0) {
            return s;
        }
        s += this.stringifyWithSign(this.d);

        return s;
    }
}
