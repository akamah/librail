import { Rot } from './Rot';
import { Dir } from './Dir';
import { Pole } from './Pole';
import { Flip } from './Flip';
import { Point } from './Point';
import { End } from './End';
import { RailInstance } from './Rail';
export interface ParserF<T> {
    (input: string): [T, string] | null;
}
export declare class Parser {
    static string(str: string): ParserF<string>;
    static identifier(input: string): [string, string] | null;
    static number(input: string): [number, string] | null;
    static signed_number(input: string): [number, string] | null;
    static bind<T, U>(p: ParserF<T>, f: (value: T) => ParserF<U>): ParserF<U>;
    static yield<U>(val: U): ParserF<U>;
    static rot(input: string): [Rot, string] | null;
    static point(input: string): [Point, string] | null;
    static dir(input: string): [Dir, string] | null;
    static pole(input: string): [Pole, string] | null;
    static flip(input: string): [Flip, string] | null;
    static end(input: string): [End, string] | null;
    static rail(input: string): [RailInstance, string] | null;
}
