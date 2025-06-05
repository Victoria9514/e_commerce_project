import { AppState } from '@models/app.store.models';
import { CartState } from '@models/cart.models';
import { createSelector } from '@ngrx/store';
import { selectProducts } from 'src/store/selectors/product.selectors';
import { Utils } from 'src/utils';
import { } from '../cart.store';
import { selectAppState } from './shared.selectors';

export const selectCartState = createSelector(
  selectAppState,
  (state: AppState) => state?.cartState
);

export const selectCart = createSelector(
  selectCartState,
  (state: CartState) => state?.cart || []
);

export const selectCartItems = createSelector(
  selectProducts,
  selectCart,
  (products, cart) => Utils.selectFilteredItems(products, cart)
);

export const selectCartTotal = createSelector(selectCartItems, (state) =>
  state?.reduce((prev, next) => next.price + prev, 0)
);
