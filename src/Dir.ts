import { Rot } from './Rot';
import { Point } from './Point'
import { Apply } from './Apply';
import { Equal } from './Equal';


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
export class Dir implements Apply<Dir, Dir | Rot | Point>, Equal<Dir> {
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

    public opposite(): Dir {
        return new Dir((this.dir + 4) % 8);
    }

    public add(by: Dir): Dir {
        return new Dir((this.dir + by.dir) % 8);
    }

    public sub(by: Dir): Dir {
        return this.add(by.neg());
    }

    public neg(): Dir {
        return new Dir((8 - this.dir) % 8);
    }

    // 本気か？？？
    public apply(target: Dir): Dir;        
    public apply(target: Rot): Rot;        
    public apply(target: Point): Point;        
    public apply(target: Dir | Point | Rot): Dir | Point | Rot {
        if (target instanceof Dir) {
           return this.add(target);
        } else if (target instanceof Point) {
            return this.rotatePoint(target);
        } else {
            return this.rotateRot(target);
        }
    }

    public hasEffect(): boolean {
        return this.dir !== DirEnum.East;
    }

    public equal(other: Dir): boolean {
        return this.dir === other.dir;
    }

    public flipVert(): Dir {
        return this.neg();
    }

    public toRot(): Rot {
        return Dir.rotTable[this.dir % 8];
    }

    public rotateRot(r: Rot): Rot {
        return this.toRot().mul(r)
    }

    public rotatePoint(p: Point): Point {
        return new Point(
            this.rotateRot(p.single),
            this.rotateRot(p.double),
            p.up
        );
    }

    public valueOf(): string {
        return this.dir.toString();
    }
}
