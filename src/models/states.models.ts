import { AdminState } from '../components/admin/store/admin.reducer';
import { AuthState, authState } from '../components/auth/store/auth.reducer';
import { CartState, cartState } from '../components/cart/store/store';
import { ProductState } from '../components/product/store/product.reducer';
import { UserState } from '../components/user/store/user.reducer';
import { IProduct } from './product.model';
import { User } from './user.model';

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
  userState: { user: {} as User, orders: [] },
  adminState: { users: [], isAdmin: false, orders: [] },
  sharedState: sharedState,
  authState: authState,
  cartState: cartState,
};
