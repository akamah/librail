import * as assert from 'assert';
import { Parser } from '../src/Parser';
import { Rot } from '../src/Rot'
import { Dir } from '../src/Dir'
import { Pole } from '../src/Pole'
import { Flip }  from '../src/Flip'
import { Point } from '../src/Point'
import { End }   from '../src/End'
import { Rail, RailInstance }  from '../src/Rail'

describe("Parser", () => {
    it('can parse digit', () => {
        assert.deepEqual(Parser.number("12345"), [12345, ""]);
        assert.deepEqual(Parser.number("-12+34"), [-12, "+34"]);
        assert.deepEqual(Parser.number("+0,3"), null);
        assert.deepEqual(Parser.number("-0,3"), null);
        assert.deepEqual(Parser.number("0,3"), [0, ",3"]);
    });

    it('can parse number', () => {
        assert.deepEqual(Parser.signed_number("-12345"), [-12345, ""]);
        assert.deepEqual(Parser.signed_number("+12+34"), [12, "+34"]);
        assert.deepEqual(Parser.signed_number("0,3"), null);
    });

    it('can parse rot', () => {
        assert.deepEqual(Parser.rot("1+2+3+4"), [Rot.of(1, 2, 3, 4), ""]);
        assert.deepEqual(Parser.rot("1-2-3-4+5"), [Rot.of(1,-2,-3,-4), "+5"]);
        assert.deepEqual(Parser.rot("-1"), [Rot.of(-1), ""]);
        assert.deepEqual(Parser.rot("+1+2"), null);
    });

    it('can parse point', () => {
        assert.deepEqual(Parser.point("0:0:0"), [Point.of(Rot.zero()), ""]);
        assert.deepEqual(Parser.point("1-2-3-4:-1:-4"),
         [Point.of(Rot.of(1,-2,-3,-4), Rot.of(-1), -4), ""]);
    });

    it('can parse end', () => {
        assert.deepEqual(Parser.end("0:0:0,6,0"),
                         [End.of(Point.of(Rot.zero()), Dir.South, Pole.Plus), ""]);
    });

    
});
