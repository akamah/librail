import { Rot } from './Rot'
import { Dir } from './Dir'
import { Pole } from './Pole'
import { Flip }  from './Flip'
import { Point } from './Point'
import { End }   from './End'
import { Rail, RailInstance }  from './Rail'

export interface ParserF<T> {
    (input: string): [T, string] | null;
}

export class Parser {
    public static string(str: string): ParserF<string> {
        return input => input.startsWith(str) ? [str, input.substring(str.length)] : null;
    } 
    
    public static identifier(input: string): [string, string] | null {
        let r = /^([0-9A-Za-z])(.*)$/.exec(input);
        return r ? [r[1], r[2]] : null;
    }

    public static number(input: string): [number, string] | null {
        let r = /^(0|-?[1-9][0-9]*)(.*)$/.exec(input);
        return r ? [parseInt(r[1]), r[2]] : null;
    }

    public static signed_number(input: string): [number, string] | null {
        let r = /^([+-](?:0|[1-9][0-9]*))(.*)$/.exec(input);
        return r ? [parseInt(r[1]), r[2]] : null;
    }

    public static bind<T, U>(p: ParserF<T>, f: (value: T) => ParserF<U>): ParserF<U> {
        return (input: string) => {
            let result = p(input);
            return result ? f(result[0])(result[1]) : null;
        }
    }

    public static yield<U>(val: U): ParserF<U> {
        return (input: string) => [val, input]
    }

    public static rot(input: string): [Rot, string] | null {
        let a = Parser.number(input);
        if (a === null) {
            return null;
        }

        let b = Parser.signed_number(a[1]);
        if (b === null) {
            return [Rot.of(a[0]), a[1]];
        }

        let c = Parser.signed_number(b[1]);
        if (c === null) {
            return [Rot.of(a[0], b[0]), b[1]];
        }

        let d = Parser.signed_number(c[1]);
        if (d === null) {
            return [Rot.of(a[0], b[0], c[0]), c[1]];
        }        

        return [Rot.of(a[0], b[0], c[0], d[0]), d[1]];
    }

    // なんだよコレ
    public static point(input: string): [Point, string] | null {
        return Parser.bind(Parser.rot, single =>
            Parser.bind(Parser.string(":"), dummy1 =>
                Parser.bind(Parser.rot, double =>
                    Parser.bind(Parser.string(":"), dummy2 =>
                        Parser.bind(Parser.number, up =>
                            Parser.yield(Point.of(single, double, up))
                        )
                    )
                )
            )
        )(input);
    }

    public static dir(input: string): [Dir, string] | null {
        let r = /^([0-7])(.*)$/.exec(input);
        return r ? [new Dir(parseInt(r[1])), r[2]] : null;
    }

    public static pole(input: string): [Pole, string] | null {
        let r = /^([01])(.*)$/.exec(input);
        return r ? [new Pole(parseInt(r[1])), r[2]] : null;
    }

    public static flip(input: string): [Flip, string] | null {
        let r = /^([01])(.*)$/.exec(input);
        return r ? [new Flip(parseInt(r[1])), r[2]] : null;
    }

    public static end(input: string): [End, string] | null {
        return Parser.bind(Parser.point, origin =>
            Parser.bind(Parser.string(","), dummy1 =>
                Parser.bind(Parser.dir, dir =>
                    Parser.bind(Parser.string(","), dummy2 =>
                        Parser.bind(Parser.pole, pole =>
                            Parser.yield(End.of(origin, dir, pole))
                        )
                    )
                )
            )
        )(input);
    }

    public static rail(input: string): [RailInstance, string] | null {
        return Parser.bind(Parser.identifier, name =>
            Parser.bind(Parser.string("("), dummy1 =>
                Parser.bind(Parser.end, origin =>
                    Parser.bind(Parser.string(","), dummy2 =>
                        Parser.bind(Parser.flip, flip =>
                            Parser.bind(Parser.string(")"), dummy3 =>
                                Parser.yield({ name, origin, flip })
                            )
                        )
                    )
                )
            )
        )(input);
    }
}