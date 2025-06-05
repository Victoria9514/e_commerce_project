import { IProduct } from '@models/product.model';
import { createActionGroup, emptyProps, props } from '@ngrx/store';

export const CartActions = createActionGroup({
  source: 'Cart Actions',
  events: {
    getCartItems: emptyProps(),
    getCartItemsSuccess: props<{
      cart: IProduct[];
    }>(),
    addCartItem: props<{
      id: string;
    }>(),
    addCartItemSuccess: emptyProps(),
    deleteCartItem : props<{ id : string }>(),
    deleteCartItemSuccess : emptyProps(),

  },
});
