import * as assert from 'assert';
import { Rot } from '../src/Rot';
import { Dir } from '../src/Dir';


describe("Dir", () => {
    it('neg', () => {
        assert.deepEqual(Dir.SouthWest.neg(), Dir.NorthWest);
        assert.deepEqual(Dir.East.neg(), Dir.East);
    });
});
