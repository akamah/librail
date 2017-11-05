export declare class Pole {
    readonly pole: number;
    static readonly Plus: Pole;
    static readonly Minus: Pole;
    constructor(pole: number);
    match(a: Pole): boolean;
    translateBy(by: Pole): Pole;
}
