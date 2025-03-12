import { createSelector } from '@ngrx/store';
import { AppState } from '../../../models/states.models';
import { selectAppState } from '../../../store/selectors';
import { CartState } from './store';

export const selectCartState = createSelector(
  selectAppState,
  (state: AppState) => state?.cartState
);

export const selectCart = createSelector(
  selectCartState,
  (state: CartState) => state?.cart || []
);

export const selectCartTotal = createSelector(selectCart, (state) =>
  state?.reduce((prev, next) => {
    console.log(prev,next)
    return next.price + prev
  }, 0)
);
