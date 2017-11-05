/**
 * Pole
 */
enum PoleEnum {
    Plus = 0,
    Minus
}

export class Pole {
    public static readonly Plus  = new Pole(PoleEnum.Plus);
    public static readonly Minus = new Pole(PoleEnum.Minus);

    public constructor(public readonly pole: number) {
        this.pole = pole % 2;
    }
    public match(a: Pole): boolean {
        return this.pole === a.pole;
    }

    public translateBy(by: Pole): Pole {
        return new Pole((this.pole + by.pole) % 2);
    }
}
