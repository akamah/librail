import { Apply } from './Apply';
import { Equal } from './Equal';
/**
 * Expresses a point in the `Rot45' coordinate system.
 * Rot45 has four basis vectors (➡️, ↗️, ⬆️, ↖️), and its coeffcients are integers.
 * the values have no unit.
 */
export declare class Rot implements Apply<Rot, Rot>, Equal<Rot> {
    readonly a: number;
    readonly b: number;
    readonly c: number;
    readonly d: number;
    constructor(a: number, b?: number, c?: number, d?: number);
    static zero(): Rot;
    static of(a: number, b?: number, c?: number, d?: number): Rot;
    toReal(): [number, number];
    add(that: Rot): Rot;
    sub(that: Rot): Rot;
    /**
     * negate the point, rotate 180 degree around the origin
     */
    neg(): Rot;
    mul(that: Rot): Rot;
    /**
     * apply transform operation
     * @param target the operand
     */
    apply(target: Rot): Rot;
    hasEffect(): boolean;
    isZero(): boolean;
    equal(other: Rot): boolean;
}
