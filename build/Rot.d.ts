/**
 * Expresses a point in the `Rot45' coordinate system.
 * Rot45 has four basis vectors (➡️, ↗️, ⬆️, ↖️), and its coeffcients are integers.
 * the values have no unit.
 */
export declare class Rot {
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
    neg(): Rot;
    mul(that: Rot): Rot;
    flipVert(): Rot;
}
