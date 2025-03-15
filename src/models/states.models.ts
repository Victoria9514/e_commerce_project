import { AdminState } from '../components/admin/store/admin.reducer';
import { AuthState, authState } from '../components/auth/store/auth.reducer';
import { CartState, cartState } from '../components/cart/store/store';
import { ProductState } from '../components/product/store/product.reducer';
import { UserState, userState } from '../components/user/store/user.reducer';
import { IProduct } from './product.model';
export interface ICategory {
  id: number;
  name: string;
  desc: string;
}

export interface ISubCategory extends ICategory {
  categoryId: number;
}

export interface ICategoryRes {
  categories: Array<ICategory>;
  message: string;
}

export interface ISubCategoryRes {
  sub_categories: Array<ISubCategory>;
  message: string;
}

export interface SharedState {
  loading: boolean;
  message: string;
  categories: ICategoryRes;
  sub_categories: ISubCategoryRes;
  categoryOptions: number;
  is_dark_mode: boolean;
}

export const sharedState = {
  loading: false,
  message: '',
  categories: { categories: [{ id: 0, name: '', desc: '' }], message: '' },
  sub_categories: {
    sub_categories: [{ id: 0, name: '', desc: '', categoryId: 0 }],
    message: '',
  },
  categoryOptions: 0,
  is_dark_mode: false
};

export interface AppState {
  productsState: ProductState;
  userState: UserState;
  adminState: AdminState;
  sharedState: SharedState;
  authState: AuthState;
  cartState: CartState;
}

export const appState: AppState = {
  productsState: {
    products: [],
    currentProduct: {} as IProduct,
    filteredProducts: null,
    deletedProductId: '',
    searchQuery: '',
    searchProductResults: [],
    wishlist: [],
  },
  userState,
  adminState: { users: [], isAdmin: false, orders: [] },
  sharedState,
  authState,
  cartState
};
