"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Rot_1 = require("./Rot");
const Dir_1 = require("./Dir");
const Pole_1 = require("./Pole");
const Flip_1 = require("./Flip");
const Point_1 = require("./Point");
const End_1 = require("./End");
class Parser {
    static string(str) {
        return input => input.startsWith(str) ? [str, input.substring(str.length)] : null;
    }
    static identifier(input) {
        let r = /^([0-9A-Za-z])(.*)$/.exec(input);
        return r ? [r[1], r[2]] : null;
    }
    static number(input) {
        let r = /^(0|-?[1-9][0-9]*)(.*)$/.exec(input);
        return r ? [parseInt(r[1]), r[2]] : null;
    }
    static signed_number(input) {
        let r = /^([+-](?:0|[1-9][0-9]*))(.*)$/.exec(input);
        return r ? [parseInt(r[1]), r[2]] : null;
    }
    static bind(p, f) {
        return (input) => {
            let result = p(input);
            return result ? f(result[0])(result[1]) : null;
        };
    }
    static yield(val) {
        return (input) => [val, input];
    }
    static rot(input) {
        let a = Parser.number(input);
        if (a === null) {
            return null;
        }
        let b = Parser.signed_number(a[1]);
        if (b === null) {
            return [Rot_1.Rot.of(a[0]), a[1]];
        }
        let c = Parser.signed_number(b[1]);
        if (c === null) {
            return [Rot_1.Rot.of(a[0], b[0]), b[1]];
        }
        let d = Parser.signed_number(c[1]);
        if (d === null) {
            return [Rot_1.Rot.of(a[0], b[0], c[0]), c[1]];
        }
        return [Rot_1.Rot.of(a[0], b[0], c[0], d[0]), d[1]];
    }
    // なんだよコレ
    static point(input) {
        return Parser.bind(Parser.rot, single => Parser.bind(Parser.string(":"), dummy1 => Parser.bind(Parser.rot, double => Parser.bind(Parser.string(":"), dummy2 => Parser.bind(Parser.number, up => Parser.yield(Point_1.Point.of(single, double, up)))))))(input);
    }
    static dir(input) {
        let r = /^([0-7])(.*)$/.exec(input);
        return r ? [new Dir_1.Dir(parseInt(r[1])), r[2]] : null;
    }
    static pole(input) {
        let r = /^([01])(.*)$/.exec(input);
        return r ? [new Pole_1.Pole(parseInt(r[1])), r[2]] : null;
    }
    static flip(input) {
        let r = /^([01])(.*)$/.exec(input);
        return r ? [new Flip_1.Flip(parseInt(r[1])), r[2]] : null;
    }
    static end(input) {
        return Parser.bind(Parser.point, origin => Parser.bind(Parser.string(","), dummy1 => Parser.bind(Parser.dir, dir => Parser.bind(Parser.string(","), dummy2 => Parser.bind(Parser.pole, pole => Parser.yield(End_1.End.of(origin, dir, pole)))))))(input);
    }
    static rail(input) {
        return Parser.bind(Parser.identifier, name => Parser.bind(Parser.string("("), dummy1 => Parser.bind(Parser.end, origin => Parser.bind(Parser.string(","), dummy2 => Parser.bind(Parser.flip, flip => Parser.bind(Parser.string(")"), dummy3 => Parser.yield({ name, origin, flip })))))))(input);
    }
}
exports.Parser = Parser;
