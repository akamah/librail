"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const End_1 = require("./End");
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
    apply(target) {
        if (target instanceof Pole) {
            return this.applyPole(target);
        }
        else {
            return this.applyEnd(target);
        }
    }
    applyPole(target) {
        return new Pole((this.pole + target.pole) % 2);
    }
    applyEnd(target) {
        if (this.isMinus()) {
            return new End_1.End(target.point, target.dir, this.applyPole(target.pole));
        }
        else {
            return target;
        }
    }
    equal(other) {
        return this.pole === other.pole;
    }
    isPlus() {
        return this.pole === PoleEnum.Plus;
    }
    isMinus() {
        return this.pole === PoleEnum.Minus;
    }
    hasEffect() {
        return this.isMinus();
    }
    opposite() {
        return new Pole((1 - this.pole) % 2);
    }
}
Pole.Plus = new Pole(PoleEnum.Plus);
Pole.Minus = new Pole(PoleEnum.Minus);
exports.Pole = Pole;
