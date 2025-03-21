import {
  AdminState,
  adminState,
} from '../components/admin/store/admin.reducer';
import { AuthState, authState } from '../components/auth/store/auth.reducer';
import { CartState, cartState } from '../components/cart/store/store';
import {
  ProductState,
  productState,
} from '../components/product/store/product.reducer';
import { UserState, userState } from '../components/user/store/user.reducer';
import { CategorySizes } from './product.model';
export interface ICategory {
  id: number;
  type: string;
  desc: string;
  children: ICategory[];
  categoryId?: number
}

export interface SharedState {
  loading: boolean;
  message: string;
  categories: Array<ICategory>;
  categoryOptions: number;
  categorySizes: CategorySizes;
  is_dark_mode: boolean;
}

export const sharedState = {
  loading: false,
  message: '',
  categories: [] as ICategory[],
  categoryOptions: 0,
  categorySizes: [],
  is_dark_mode: false,
};

export interface AppState {
  productState: ProductState;
  userState: UserState;
  adminState: AdminState;
  sharedState: SharedState;
  authState: AuthState;
  cartState: CartState;
}

export const appState: AppState = {
  productState,
  userState,
  adminState,
  sharedState,
  authState,
  cartState,
};
