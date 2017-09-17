"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Rot_1 = require("./Rot");
var Dir;
(function (Dir) {
    Dir[Dir["North"] = 0] = "North";
    Dir[Dir["NorthWest"] = 1] = "NorthWest";
    Dir[Dir["West"] = 2] = "West";
    Dir[Dir["SouthWest"] = 3] = "SouthWest";
    Dir[Dir["South"] = 4] = "South";
    Dir[Dir["SouthEast"] = 5] = "SouthEast";
    Dir[Dir["East"] = 6] = "East";
    Dir[Dir["NorthEast"] = 7] = "NorthEast";
})(Dir = exports.Dir || (exports.Dir = {}));
(function (Dir) {
    function match(a, b) {
        return opposite(a) == b;
    }
    Dir.match = match;
    function opposite(a) {
        return (a + 4) % 8;
    }
    Dir.opposite = opposite;
    function neg(a) {
        return (8 - a) % 8;
    }
    Dir.neg = neg;
    function rotate(target, by) {
        return (target + by) % 8;
    }
    Dir.rotate = rotate;
    function translateBy(target, by) {
        return rotate(target, by);
    }
    Dir.translateBy = translateBy;
    function toRot(target) {
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
        return tab[target % 8];
    }
    Dir.toRot = toRot;
})(Dir = exports.Dir || (exports.Dir = {}));
