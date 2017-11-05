"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var PoleEnum;
(function (PoleEnum) {
    PoleEnum[PoleEnum["Plus"] = 0] = "Plus";
    PoleEnum[PoleEnum["Minus"] = 1] = "Minus";
})(PoleEnum || (PoleEnum = {}));
/**
 * Pole
 */
class Pole {
    constructor(pole) {
        this.pole = pole;
        this.pole = pole % 2;
    }
    match(a) {
        return this.pole === a.pole;
    }
    apply(target) {
        return new Pole((this.pole + target.pole) % 2);
    }
    invert() {
        return this;
    }
}
Pole.Plus = new Pole(PoleEnum.Plus);
Pole.Minus = new Pole(PoleEnum.Minus);
exports.Pole = Pole;
