"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Rot_1 = require("./Rot");
const Point_1 = require("./Point");
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
    opposite() {
        return new Dir((this.dir + 4) % 8);
    }
    add(by) {
        return new Dir((this.dir + by.dir) % 8);
    }
    sub(by) {
        return this.add(by.neg());
    }
    neg() {
        return new Dir((8 - this.dir) % 8);
    }
    apply(target) {
        if (target instanceof Dir) {
            return this.add(target);
        }
        else if (target instanceof Point_1.Point) {
            return this.rotatePoint(target);
        }
        else {
            return this.rotateRot(target);
        }
    }
    hasEffect() {
        return this.dir !== DirEnum.East;
    }
    equal(other) {
        return this.dir === other.dir;
    }
    flipVert() {
        return this.neg();
    }
    toRot() {
        return Dir.rotTable[this.dir % 8];
    }
    rotateRot(r) {
        return this.toRot().mul(r);
    }
    rotatePoint(p) {
        return new Point_1.Point(this.rotateRot(p.single), this.rotateRot(p.double), p.up);
    }
    valueOf() {
        return this.dir.toString();
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
Dir.rotTable = [
    new Rot_1.Rot(1, 0, 0, 0),
    new Rot_1.Rot(0, 1, 0, 0),
    new Rot_1.Rot(0, 0, 1, 0),
    new Rot_1.Rot(0, 0, 0, 1),
    new Rot_1.Rot(-1, 0, 0, 0),
    new Rot_1.Rot(0, -1, 0, 0),
    new Rot_1.Rot(0, 0, -1, 0),
    new Rot_1.Rot(0, 0, 0, -1)
];
exports.Dir = Dir;
