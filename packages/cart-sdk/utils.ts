export const cartKeys = {
   cart: ['cart'],
   checkoutUrl: ['cart', 'checkoutUrl'],
};

export enum CartError {
   EmptyCart = 'empty_cart',
   UnknownError = 'unknown_error',
}
