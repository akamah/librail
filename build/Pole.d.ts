import { Apply } from './Apply';
/**
 * Pole
 */
export declare class Pole implements Apply<Pole, Pole> {
    readonly pole: number;
    static readonly Plus: Pole;
    static readonly Minus: Pole;
    constructor(pole: number);
    match(a: Pole): boolean;
    apply(target: Pole): Pole;
    invert(): Pole;
}
