import { createReducer, on } from '@ngrx/store';
import { IProduct } from '../../../models/product.model';
import { ProductsActions } from './product.actions';

export interface ProductState {
  products: IProduct[];
  currentProduct: IProduct | undefined;
  filteredProducts: null | IProduct[];
  deletedProductId: string;
  wishlist: string[];
  searchQuery: string;
  searchProductResults: IProduct[];
}

export const productState: ProductState = {
  products: [],
  currentProduct: undefined,
  filteredProducts: null,
  deletedProductId: '',
  searchQuery: '',
  searchProductResults: [],
  wishlist: [],
};

export const productReducer = createReducer(
  productState,
  on(ProductsActions.loadProductsSuccess, (state: ProductState, payload) => {
    return {
      ...state,
      products: payload?.products,
      currentProduct: undefined,
    };
  }),
  on(ProductsActions.deleteProduct, (state: ProductState, payload) => {
    return {
      ...state,
      products: state.products?.filter(
        (pr) => pr.product_id !== payload.product_id
      ),
    };
  }),
  on(ProductsActions.updateProduct, (state: ProductState, payload) => {
    return {
      ...state,
    };
  }),
  on(ProductsActions.addProductSuccess, (state: ProductState) => {
    return {
      ...state,
      products: [...state.products],
    };
  }),
  on(
    ProductsActions.getCurrentProductSuccess,
    (state: ProductState, payload) => {
      return {
        ...state,
        currentProduct: payload?.currentProduct,
      };
    }
  ),
  on(ProductsActions.navigateToToGender, (state: ProductState, payload) => {
    return {
      ...state,
      filteredProducts: state.products?.filter(
        (g) => g?.gender === payload?.gender
      ),
    };
  }),
  on(ProductsActions.updateProduct, (state, payload) => {
    return {
      ...state,
      products: [
        ...state.products.map((p) =>
          p.product_id === payload.product.product_id
            ? { ...payload.product }
            : p
        ),
      ],
    };
  }),
  on(ProductsActions.queryChanged, (state, payload) => {
    return {
      ...state,
      searchQuery: payload.query,
    };
  }),
  on(ProductsActions.queryChangedSuccess, (state, payload) => {
    return {
      ...state,
      searchProductResults: payload.products.filter((pr) => {
        return (
          pr.title.toLowerCase().includes(state.searchQuery.toLowerCase()) ||
          pr.title.toLowerCase().startsWith(state.searchQuery.toLowerCase())
        );
      }),
    };
  }),
  on(ProductsActions.toggleFavorite, (state, payload) => {
    return {
      ...state,
      products: state?.products?.map((pr) => {
        return pr.product_id === payload.id
          ? { ...pr, favorite: !pr.favorite }
          : pr;
      }),
      wishlist: [...state.wishlist, payload.id],
    };
  })
);
