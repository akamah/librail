import * as assert from 'assert';
import { End } from '../src/End';
import { Point } from '../src/Point';
import { Rot } from '../src/Rot';
import { Dir } from '../src/Dir';
import { Pole } from '../src/Pole';


describe("End", () => {
    it('invert', () => {
        const actual = End.of(Point.of(Rot.of(1, 2, 3, 4), Rot.zero(), 5), Dir.NorthEast, Pole.Minus).invert();
        const expect = End.of(Point.of(Rot.of(-1, 4, 3, 2), Rot.zero(), -5), Dir.NorthWest, Pole.Minus);
        assert.deepEqual(actual, expect);
    });

    it('transform', () => {
        const local = End.of(Point.of(Rot.of(0, 0, 0, 0), Rot.zero(), 1), Dir.NorthEast, Pole.Minus);
        const global = End.of(Point.of(Rot.of(0, 1, 0, 0), Rot.zero(), 2), Dir.NorthEast, Pole.Plus);
        const expect = End.of(Point.of(Rot.of(0, 1, 1, 0), Rot.zero(), 3), Dir.SouthWest, Pole.Minus);

        assert.deepEqual(local.transformBy(global), expect);
        
    });
});
