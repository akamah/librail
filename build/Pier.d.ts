import { End } from './End';
export declare class Pier {
    name: string;
    height: number;
    origin: End;
    constructor(at: End);
    private normalizeEnd(e);
    private normalizeDir(d);
}
export declare class MiniPier extends Pier {
    name: string;
    height: number;
}
export declare class CustomPier extends Pier {
    floors: number[];
    name: string;
    constructor(at: End, floors: number[]);
    private endWithReplacingUp(end, up);
    equivalentPiers(): Pier[];
}
