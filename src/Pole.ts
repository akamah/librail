/**
 * Pole
 */
enum PoleEnum {
    Plus = 0,
    Minus
}

export class Pole {
    static readonly Plus  = new Pole(PoleEnum.Plus);
    static readonly Minus = new Pole(PoleEnum.Minus);

    constructor(public readonly pole: number) {
        this.pole = pole % 2;
    }
    match(a: Pole): boolean {
        return this.pole === a.pole;
    }

    translateBy(by: Pole): Pole {
        return new Pole((this.pole + by.pole) % 2);
    }
}
