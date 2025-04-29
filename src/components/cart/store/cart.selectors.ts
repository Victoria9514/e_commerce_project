import { AppState } from '@models/states.models';
import { createSelector } from '@ngrx/store';
import { selectProducts } from 'src/components/product/store/product.selector';
import { Utils } from 'src/utils';
import { selectAppState } from '../../../shared/spinner/store/shared.selectors';
import { CartState } from './cart.store';

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
