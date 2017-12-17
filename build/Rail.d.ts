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
export declare class RailFactory {
    name: String;
    localEnds: End[];
    canFlip: Meaning;
    hasPole: Meaning;
    localPierEnds: End[];
    /**
     *
     * @param name unique identifier among the rails
     * @param localEnds [0] should be the origin
     * @param canFlip Impossible => Flip.No only
     *                DontCare => flip will be Flip.No, but one can specify Flip.Yes
     *                Meaningful => set to given parameter
     * @param hasPole Impossible => origin's pole must be Pole.Plus
     *                DontCare => will be normalized to Pole.Plus, by flipping and
     *                            setting the origin to other end,
     *                            therefore localEnds should have exact 2 elems
     *                Meaningful => meaningful
     * @param localPierPoints an point to set a pier, pole will be ignored
     */
    constructor(name: String, localEnds: End[], canFlip: Meaning, hasPole: Meaning, localPierEnds?: End[]);
    /**
     * このメソッドでは，端点termを指定された場合は，原点の座標に戻してインスタンスを作る．
     * @param term a valid index of localEnds.
     * @param origin origin
     * @param flip isFlipped
     */
    create(term: number, termEnd: End, flip: Flip): RailInstance;
    convert(from: number, to: number, end: End, flip: Flip): End;
    canCreate(term: number, origin_: End, flip: Flip): boolean;
}
export declare class Rail {
    factory: RailFactory;
    instance: RailInstance;
    constructor(factory: RailFactory, term: number, origin: End, flip: Flip);
    localToGlobal(local: End): End;
    ends(): End[];
    pierPoints(): End[];
}
export declare const Straight: RailFactory;
export declare const Curve: RailFactory;
export declare const Slope: RailFactory;
export declare const Turnout: RailFactory;
