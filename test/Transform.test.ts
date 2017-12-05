import * as assert from 'assert';
import { FromTo } from '../src/Transform';
import { End } from '../src/End';
import { Point } from '../src/Point';
import { Rot } from '../src/Rot';
import { Dir } from '../src/Dir';
import { Pole } from '../src/Pole';



describe("Transform", () => {
    it('can calculate `from-to`', () => {
        let l1 = End.of(Point.of(Rot.of(0, 0, 4)), Dir.South, Pole.Minus);
        let l2 = End.of(Point.of(Rot.of(4, 0, 0, 4)), Dir.SouthWest, Pole.Minus);
        
        let g1 = End.of(Point.of(Rot.of(8)), Dir.West, Pole.Plus);
        let g2 = End.of(Point.of(Rot.of(4, 4, -4)), Dir.NorthWest, Pole.Plus);
        let ft = new FromTo(l1, l2);

        assert.deepEqual(ft.apply(g1), g2);
    });
});
