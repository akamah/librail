import * as assert from 'assert';
import { Rot } from '../src/Rot';
import { Dir } from '../src/Dir';


describe("Dir", () => {
    it('neg', () => {
        assert.deepEqual(Dir.neg(Dir.SouthWest), Dir.NorthWest);
        assert.deepEqual(Dir.neg(Dir.East), Dir.East);
    });
});
