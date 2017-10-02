export enum Pole {
    Plus = 0,
    Minus
}

export namespace Pole {
    export function match(a: Pole, b: Pole): boolean {
        return a != b;
    }

    export function translateBy(target: Pole, by: Pole): Pole {
        return (target + by) % 2;
    }
}
