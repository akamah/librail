"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Pole;
(function (Pole) {
    Pole[Pole["Plus"] = 0] = "Plus";
    Pole[Pole["Minus"] = 1] = "Minus";
})(Pole = exports.Pole || (exports.Pole = {}));
(function (Pole) {
    function match(a, b) {
        return a != b;
    }
    Pole.match = match;
    function translateBy(target, by) {
        return (target + by) % 2;
    }
    Pole.translateBy = translateBy;
})(Pole = exports.Pole || (exports.Pole = {}));
