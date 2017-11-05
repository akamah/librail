"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Pole
 */
var PoleEnum;
(function (PoleEnum) {
    PoleEnum[PoleEnum["Plus"] = 0] = "Plus";
    PoleEnum[PoleEnum["Minus"] = 1] = "Minus";
})(PoleEnum || (PoleEnum = {}));
class Pole {
    constructor(pole) {
        this.pole = pole;
        this.pole = pole % 2;
    }
    match(a) {
        return this.pole === a.pole;
    }
    translateBy(by) {
        return new Pole((this.pole + by.pole) % 2);
    }
}
Pole.Plus = new Pole(PoleEnum.Plus);
Pole.Minus = new Pole(PoleEnum.Minus);
exports.Pole = Pole;
