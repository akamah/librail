import { Apply } from './Apply'

enum PoleEnum {
    Plus = 0,
    Minus
}

/**
 * Pole
 */
export class Pole implements Apply<Pole, Pole> {
    public static readonly Plus  = new Pole(PoleEnum.Plus);
    public static readonly Minus = new Pole(PoleEnum.Minus);

    public constructor(public readonly pole: number) {
        this.pole = pole % 2;
    }
    public match(a: Pole): boolean {
        return this.pole !== a.pole;
    }

    public apply(target: Pole): Pole {
        return new Pole((this.pole + target.pole) % 2);
    }

    public invert(): Pole {
        return this;
    }

    public isPlus(): boolean {
        return this.pole === PoleEnum.Plus;
    }
    
    public isMinus(): boolean {
        return this.pole === PoleEnum.Minus;
    }
}
