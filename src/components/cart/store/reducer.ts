import { createReducer, on } from "@ngrx/store";
import { CartActions } from "./actions";
import { cartState } from "./store";

export const cartReducer = createReducer(
  cartState,
  on(CartActions.addCartItem, (state,payload) => {
    return {
      ...state,
      cart: [...state.cart, payload.product]
    }
  })
)
