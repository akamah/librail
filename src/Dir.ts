import { Rot } from './Rot';


export enum Dir {
    East = 0,
    NorthEast,
    North,
    NorthWest,
    West,
    SouthWest,
    South,
    SouthEast
}

export namespace Dir {
    export function match(a: Dir, b: Dir): boolean {
        return opposite(a) == b;
    }

    export function opposite(a: Dir): Dir {
        return (a + 4) % 8;
    }

    export function neg(a: Dir): Dir {
        return (8 - a) % 8;
    }

    export function rotate(target: Dir, by: Dir): Dir {
        return (target + by) % 8;
    }

    export function translateBy(target: Dir, by: Dir): Dir {
        return rotate(target, by);
    }

    export function invert(target: Dir, inverse = true): Dir {
        if (inverse) {
            return Dir.neg(target);
        } else {
            return target;
        }
    }

    export function toRot(target: Dir): Rot {
        const tab = [
            new Rot(1, 0, 0, 0),
            new Rot(0, 1, 0, 0),
            new Rot(0, 0, 1, 0),
            new Rot(0, 0, 0, 1),
            new Rot(-1,0, 0, 0),
            new Rot(0, -1,0, 0),
            new Rot(0, 0, -1,0),
            new Rot(0, 0, 0,-1)
        ]

        return tab[target % 8];
    }
}
