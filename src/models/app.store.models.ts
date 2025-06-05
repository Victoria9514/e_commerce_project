import { CartState } from '@models/cart.models';
import { FilterState } from '@models/filter.models';
import { NavigationState } from '@models/navigation.models';
import { SharedState } from '@models/shared.models';
import { cartState } from 'src/store/cart.store';
import {
  AdminState,
  adminState,
} from 'src/store/reducers/admin.reducer';
import { AuthState, authState } from 'src/store/reducers/auth.reducer';

import { filterState } from 'src/store/filter.store';
import {
  ProductState,
  productState,
} from 'src/store/reducers/product.reducer';
import { UserState, userState } from 'src/store/reducers/user.reducer';
import { sharedState } from 'src/store/shared.store';
import { navigationState } from '../store/navigation.store';

export interface AppState {
  productState: ProductState;
  userState: UserState;
  adminState: AdminState;
  sharedState: SharedState;
  authState: AuthState;
  cartState: CartState;
  filterState: FilterState;
  navigationState: NavigationState;
}

export const appState: AppState = {
  productState,
  sharedState,
  filterState,
  userState,
  adminState,
  authState,
  cartState,
  navigationState
};
