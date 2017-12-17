import { Rot } from './Rot'
import { Point } from './Point'
import { Pole } from './Pole'
import { End } from './End'
import { Dir } from './Dir'
import { Flip } from './Flip'
import { FromTo } from './Transform'


export class Pier {
    public name = "pier"
    public height = 4;
    public origin: End;

    constructor(at: End) {
        this.origin = this.normalizeEnd(at);
    }

    private normalizeEnd(e: End): End {
        return new End(e.point, this.normalizeDir(e.dir), Pole.Plus);
    }

    private normalizeDir(d: Dir): Dir {
        return new Dir(d.dir % 4);
    }
}

export class MiniPier extends Pier {
    name = "mini pier"
    height = 1;
}

export class CustomPier extends Pier {
    public name = "CustomPier";

    constructor(at: End, public floors: number[]) {
        super(at);
    }

    private endWithReplacingUp(end: End, up: number): End {
        let p = new Point(this.origin.point.single, this.origin.point.double, up);
        return new End(p, this.origin.dir, this.origin.pole);
    }

    public equivalentPiers(): Pier[] {
        var piers: Pier[] = [];
        var current = 0;

        this.floors.sort().forEach(n => {
            // n階層になるまで建て続ける
            for (; current + 4 <= n; current += 4) {
                let e = this.endWithReplacingUp(this.origin, current);
                piers.push(new Pier(e));
            }
            for (; current + 1 <= n; current += 1) {
                let e = this.endWithReplacingUp(this.origin, current);
                piers.push(new MiniPier(e));
            }
            // n階になった．
        });

        return piers;
    }
}
