import { Apply } from './Apply';
import { Equal } from './Equal';
import { End } from './End';
/**
 * Pole
 */
export declare class Pole implements Apply<Pole, Pole>, Equal<Pole> {
    readonly pole: number;
    static readonly Plus: Pole;
    static readonly Minus: Pole;
    constructor(pole: number);
    apply(target: Pole): Pole;
    apply(target: End): End;
    applyPole(target: Pole): Pole;
    applyEnd(target: End): End;
    equal(other: Pole): boolean;
    isPlus(): boolean;
    isMinus(): boolean;
    hasEffect(): boolean;
    opposite(): Pole;
    valueOf(): string;
}
