import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { IProduct } from '../../../models/product.model';

export const CartActions = createActionGroup({
  source: 'Cart Actions',
  events: {
    getCartItems: emptyProps(),
    getCartItemsSuccess: props<{
      cart: IProduct[];
    }>(),
    addCartItem: props<{
      product: IProduct;
    }>(),
    addCartItemSuccess: emptyProps(),
  },
});
