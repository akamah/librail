/**
 * application
 *
 */
export interface Apply<This, Elem> {
    apply(elem: Elem): Elem;
    invert(): This;
}
