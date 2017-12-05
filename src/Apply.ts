/**
 * application
 * 
 */
export interface Apply<This, Elem> {
    apply(elem: Elem): Elem;
    hasEffect(): boolean;
}
