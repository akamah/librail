"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Pier {
    constructor(origin, dir) {
        this.origin = origin;
        this.dir = dir;
        this.name = "pier";
        this.height = 4;
    }
}
exports.Pier = Pier;
class MiniPier extends Pier {
    constructor() {
        super(...arguments);
        this.name = "mini pier";
        this.height = 1;
    }
}
exports.MiniPier = MiniPier;
