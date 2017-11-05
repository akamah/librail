import { Rot } from './Rot';


enum DirEnum {
    East = 0,
    NorthEast,
    North,
    NorthWest,
    West,
    SouthWest,
    South,
    SouthEast
}

/**
 * Dirの正面方向，つまり角度としての0度の方向は東側とする．
 * そのため，negで逆をとったら南北が反転するものとする．
 */
export class Dir {
    static readonly East = new Dir(DirEnum.East);
    static readonly NorthEast = new Dir(DirEnum.NorthEast);
    static readonly North = new Dir(DirEnum.North);
    static readonly NorthWest = new Dir(DirEnum.NorthWest);
    static readonly West = new Dir(DirEnum.West);
    static readonly SouthWest = new Dir(DirEnum.SouthWest);
    static readonly South = new Dir(DirEnum.South);
    static readonly SouthEast = new Dir(DirEnum.SouthEast);
    

    constructor(public readonly dir: number) {
        this.dir = dir % 8;
    }

    public match(a: Dir): boolean {
        return this.opposite().dir === a.dir; // FIXME: equality?
    }

    public opposite(): Dir {
        return new Dir((this.dir + 4) % 8);
    }

    public neg(): Dir {
        return new Dir((8 - this.dir) % 8);
    }

    public add(by: Dir): Dir {
        return new Dir((this.dir + by.dir) % 8);
    }

    public translateBy(by: Dir): Dir {
        return this.add(by);
    }

    public invert(inverse = true): Dir {
        if (inverse) {
            return this.neg();
        } else {
            return this;
        }
    }

    public toRot(): Rot {
        const tab = [
            new Rot(1, 0, 0, 0),
            new Rot(0, 1, 0, 0),
            new Rot(0, 0, 1, 0),
            new Rot(0, 0, 0, 1),
            new Rot(-1,0, 0, 0),
            new Rot(0, -1,0, 0),
            new Rot(0, 0, -1,0),
            new Rot(0, 0, 0,-1)
        ]

        return tab[this.dir % 8];
    }
}
