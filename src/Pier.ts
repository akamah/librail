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
    }
}

export class MiniPier extends Pier {
    public name = "mini pier"
    public height = 1;
}
