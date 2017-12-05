import { Apply } from './Apply'
import { Equal } from './Equal';
import { End } from './End';


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


    public apply(target: Pole): Pole;
    public apply(target: End): End;
    public apply(target: Pole | End): Pole | End {
        if (target instanceof Pole) {
            return this.applyPole(target);
        } else {
            return this.applyEnd(target);
        }
    }

    public applyPole(target: Pole): Pole {
        return new Pole((this.pole + target.pole) % 2);
    }

    public applyEnd(target: End): End {
        if (this.isMinus()) {
            return new End(
                target.point,
                target.dir,
                this.applyPole(target.pole));
        } else {
            return target;
        }
    }

    public equal(other: Pole): boolean {
        return this.pole === other.pole;
    }

    public isPlus(): boolean {
        return this.pole === PoleEnum.Plus;
    }
    
    public isMinus(): boolean {
        return this.pole === PoleEnum.Minus;
    }

    public hasEffect(): boolean {
        return this.isMinus();
    }

    public opposite(): Pole {
        return new Pole((1 - this.pole) % 2);
    }
}
