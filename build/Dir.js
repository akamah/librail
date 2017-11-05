"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Rot_1 = require("./Rot");
var DirEnum;
(function (DirEnum) {
    DirEnum[DirEnum["East"] = 0] = "East";
    DirEnum[DirEnum["NorthEast"] = 1] = "NorthEast";
    DirEnum[DirEnum["North"] = 2] = "North";
    DirEnum[DirEnum["NorthWest"] = 3] = "NorthWest";
    DirEnum[DirEnum["West"] = 4] = "West";
    DirEnum[DirEnum["SouthWest"] = 5] = "SouthWest";
    DirEnum[DirEnum["South"] = 6] = "South";
    DirEnum[DirEnum["SouthEast"] = 7] = "SouthEast";
})(DirEnum || (DirEnum = {}));
/**
 * Dirの正面方向，つまり角度としての0度の方向は東側とする．
 * そのため，negで逆をとったら南北が反転するものとする．
 */
class Dir {
    constructor(dir) {
        this.dir = dir;
        this.dir = dir % 8;
    }
    match(a) {
        return this.opposite().dir === a.dir; // FIXME: equality?
    }
    opposite() {
        return new Dir((this.dir + 4) % 8);
    }
    neg() {
        return new Dir((8 - this.dir) % 8);
    }
    add(by) {
        return new Dir((this.dir + by.dir) % 8);
    }
    translateBy(by) {
        return this.add(by);
    }
    invert(inverse = true) {
        if (inverse) {
            return this.neg();
        }
        else {
            return this;
        }
    }
    toRot() {
        const tab = [
            new Rot_1.Rot(1, 0, 0, 0),
            new Rot_1.Rot(0, 1, 0, 0),
            new Rot_1.Rot(0, 0, 1, 0),
            new Rot_1.Rot(0, 0, 0, 1),
            new Rot_1.Rot(-1, 0, 0, 0),
            new Rot_1.Rot(0, -1, 0, 0),
            new Rot_1.Rot(0, 0, -1, 0),
            new Rot_1.Rot(0, 0, 0, -1)
        ];
        return tab[this.dir % 8];
    }
}
Dir.East = new Dir(DirEnum.East);
Dir.NorthEast = new Dir(DirEnum.NorthEast);
Dir.North = new Dir(DirEnum.North);
Dir.NorthWest = new Dir(DirEnum.NorthWest);
Dir.West = new Dir(DirEnum.West);
Dir.SouthWest = new Dir(DirEnum.SouthWest);
Dir.South = new Dir(DirEnum.South);
Dir.SouthEast = new Dir(DirEnum.SouthEast);
exports.Dir = Dir;
