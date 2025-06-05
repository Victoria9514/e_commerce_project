import { createReducer, on } from '@ngrx/store';
import { CartActions } from '../actions/cart.actions';
import { cartState } from '../cart.store';

export const cartReducer = createReducer(
  cartState,
  on(CartActions.addCartItem, (state, payload) => {
    return {
      ...state,
      cart: state.cart.includes(payload.id)
      ? state.cart.filter((id) => id !== payload.id)
      : [...state.cart, payload.id],
    };
  }),
  on(CartActions.deleteCartItem, (state, payload) => {
    return {
      ...state,
      cart: state.cart.filter((id) => id !== payload.id),
    };
  })
);
