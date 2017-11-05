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
    public static readonly East      = new Dir(DirEnum.East);
    public static readonly NorthEast = new Dir(DirEnum.NorthEast);
    public static readonly North     = new Dir(DirEnum.North);
    public static readonly NorthWest = new Dir(DirEnum.NorthWest);
    public static readonly West      = new Dir(DirEnum.West);
    public static readonly SouthWest = new Dir(DirEnum.SouthWest);
    public static readonly South     = new Dir(DirEnum.South);
    public static readonly SouthEast = new Dir(DirEnum.SouthEast);

    private static readonly rotTable = [
        new Rot(1, 0, 0, 0),
        new Rot(0, 1, 0, 0),
        new Rot(0, 0, 1, 0),
        new Rot(0, 0, 0, 1),
        new Rot(-1,0, 0, 0),
        new Rot(0, -1,0, 0),
        new Rot(0, 0, -1,0),
        new Rot(0, 0, 0,-1)
    ]

    public constructor(public readonly dir: number) {
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

    public flipVert(): Dir {
        return this.neg();
    }

    public toRot(): Rot {
        return Dir.rotTable[this.dir % 8];
    }
}
