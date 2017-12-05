import * as assert from 'assert';
import { End } from '../src/End';
import { Point } from '../src/Point';
import { Rot } from '../src/Rot';
import { Dir } from '../src/Dir';
import { Pole } from '../src/Pole';


describe("End", () => {
    it('transform', () => {
        const local  = End.of(Point.of(Rot.of(1, 0, 1, 0), Rot.zero(), 1), Dir.North, Pole.Minus);
        const global = End.of(Point.of(Rot.of(0, 0, 1, 0), Rot.zero(), 2), Dir.North, Pole.Plus);
        const expect = End.of(Point.of(Rot.of(-1,0, 2, 0), Rot.zero(), 3), Dir.West, Pole.Minus);

        assert.deepEqual(global.apply(local), expect);
        
    });
});
