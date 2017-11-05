import { End } from './End';
export declare abstract class Rail {
    constructor();
    protected abstract localEnds(): End[];
}
export declare class StraightRail extends Rail {
    readonly origin: End;
    readonly inverse: boolean;
    static readonly STRAIGHT: End;
    constructor(origin: End, inverse: boolean);
    protected localEnds(): End[];
    ends(): End[];
}
