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

    constructor(public origin: Point, public dir: Dir) {
        this.dir = new Dir(this.dir.dir % 4);
    }
}

export class MiniPier extends Pier {
    name = "mini pier"
    height = 1;
}

export class CustomPier extends Pier {
    public name = "CustomPier";

    constructor(origin: Point, dir: Dir, public floors: number[]) {
        super(origin, dir);
    }

    public equivalentPiers(): Pier[] {
        var piers: Pier[] = [];
        var current = 0;

        this.floors.sort().forEach(n => {
            // n階層になるまで建て続ける
            for (; current + 4 <= n; current += 4) {
                let e = new Point(this.origin.single, this.origin.double, current);
                piers.push(new Pier(e, this.dir));
            }
            for (; current + 1 <= n; current += 1) {
                let e = new Point(this.origin.single, this.origin.double, current);
                piers.push(new MiniPier(e, this.dir));
            }
            // n階になった．
        });

        return piers;
    }
}
