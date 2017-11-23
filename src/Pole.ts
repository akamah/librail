import { Apply } from './Apply'
import { Equal } from './Equal';


enum PoleEnum {
    Plus = 0,
    Minus
}

/**
 * Pole
 */
export class Pole implements Apply<Pole, Pole>, Equal<Pole> {
    public static readonly Plus  = new Pole(PoleEnum.Plus);
    public static readonly Minus = new Pole(PoleEnum.Minus);

    public constructor(public readonly pole: number) {
        this.pole = pole % 2;
    }

    public apply(target: Pole): Pole {
        return new Pole((this.pole + target.pole) % 2);
    }

    public equal(other: Pole): boolean {
        return this.pole === other.pole;
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

    public opposite(): Pole {
        return new Pole((1 - this.pole) % 2);
    }
}
