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
    equal(that: Rot): boolean;
}
