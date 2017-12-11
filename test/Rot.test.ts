import * as assert from 'assert';
import { Rot } from '../src/Rot';


function eqfloat(a: number, b: number, message = undefined) {
    assert(Math.abs(a - b) < 0.0001, message);
}

function eqpair(a: [number, number], b: [number, number], message = undefined) {
    eqfloat(a[0], b[0], message);
    eqfloat(a[1], b[1], message);
}

describe("Rot", () => {
    it('toReal', () => {
        eqpair(new Rot(1, 0, 0, 0).toReal(), [1, 0]);
        eqpair(new Rot(0, 1, 0, 0).toReal(), [Math.SQRT1_2, Math.SQRT1_2]);
        eqpair(new Rot(0, 0, 1, 0).toReal(), [0, 1]);
        eqpair(new Rot(0, 0, 0, 1).toReal(), [-Math.SQRT1_2, Math.SQRT1_2]);
        eqpair(new Rot(0, 1, 0, 1).toReal(), [0, Math.SQRT2]);
    });

    it('mul', () => {
        assert.deepEqual(Rot.of(1, 2, 3, 4).mul(Rot.of(1, 0, 0, 0)), Rot.of(1, 2, 3, 4));
        assert.deepEqual(Rot.of(1, 2, 3, 4).mul(Rot.of(0, 1, 0, 0)), Rot.of(-4, 1, 2, 3));
        assert.deepEqual(Rot.of(1, 2, 3, 4).mul(Rot.of(0, 0, 1, 0)), Rot.of(-3, -4, 1, 2));
        assert.deepEqual(Rot.of(1, 2, 3, 4).mul(Rot.of(0, 0, 0, 1)), Rot.of(-2, -3, -4, 1));
    });

    it('valueOf', () => {
        assert.equal(Rot.of(1, 2, 3, 4).valueOf(), "1+2+3+4");
        assert.equal(Rot.of(1, 2, 3, 0).valueOf(), "1+2+3");
        assert.equal(Rot.of(1, 2, 0, 0).valueOf(), "1+2");
        assert.equal(Rot.of(1, 0, 0, 0).valueOf(), "1");
        assert.equal(Rot.of(0, 0, 0, 0).valueOf(), "0");
        assert.equal(Rot.of(-1, -2, -3, -4).valueOf(), "-1-2-3-4");
        assert.equal(Rot.of(0, -2, -3, -4).valueOf(), "0-2-3-4");
        assert.equal(Rot.of(-1, 0, -3, -4).valueOf(), "-1+0-3-4");
       
    });
});
