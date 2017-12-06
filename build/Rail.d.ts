import { End } from './End';
import { Flip } from './Flip';
export declare enum Meaning {
    Impossible = 0,
    DontCare = 1,
    Meaningful = 2,
}
export declare type RailInstance = {
    origin: End;
    flip: Flip;
};
export declare abstract class RailFactory {
    abstract name: string;
    abstract localEnds: End[];
    abstract canFlip: Meaning;
    abstract hasPole: Meaning;
    /**
     * このメソッドでは，端点termを指定された場合は，原点の座標に戻してインスタンスを作る．
     * @param term a valid index of localEnds.
     * @param origin origin
     * @param flip isFlipped
     */
    create(term: number, termEnd: End, flip: Flip): RailInstance;
    convert(from: number, to: number, end: End, flip: Flip): End;
    canCreate(term: number, origin: End, flip: Flip): boolean;
}
export declare class Rail {
    factory: RailFactory;
    instance: RailInstance;
    constructor(factory: RailFactory, term: number, origin: End, flip: Flip);
    ends(): End[];
}
export declare class StraightRailFactory extends RailFactory {
    readonly O: End;
    readonly S: End;
    name: string;
    localEnds: End[];
    canFlip: Meaning;
    hasPole: Meaning;
    create(term: number, origin: End, flip: Flip): {
        origin: End;
        flip: Flip;
    };
}
export declare const Straight: StraightRailFactory;
export declare class CurveRailFactory extends RailFactory {
    readonly O: End;
    readonly C: End;
    name: string;
    localEnds: End[];
    canFlip: Meaning;
    hasPole: Meaning;
    create(term: number, origin: End, flip: Flip): {
        origin: End;
        flip: Flip;
    };
}
export declare const Curve: CurveRailFactory;
export declare class SlopeRailFactory extends RailFactory {
    readonly O: End;
    readonly S: End;
    name: string;
    localEnds: End[];
    canFlip: Meaning;
    hasPole: Meaning;
    create(term: number, origin: End, flip: Flip): {
        origin: End;
        flip: Flip;
    };
}
export declare const Slope: SlopeRailFactory;
