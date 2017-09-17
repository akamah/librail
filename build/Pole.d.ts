export declare enum Pole {
    Plus = 0,
    Minus = 1,
}
export declare namespace Pole {
    function match(a: Pole, b: Pole): Boolean;
    function translateBy(target: Pole, by: Pole): Pole;
}
