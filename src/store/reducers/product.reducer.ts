import { IProduct } from '@models/product.model';
import { createReducer, on } from '@ngrx/store';
import { ProductsActions } from '../actions/product.actions';

export interface ProductState {
  products: IProduct[];
  currentProduct: IProduct;
  filteredProducts: null | IProduct[];
  wishlist: string[];
  searchQuery: string;
}

export const productState: ProductState = {
  products: [],
  currentProduct: {} as IProduct,
  filteredProducts: null,
  wishlist: [],
  searchQuery: '',
};

export const productReducer = createReducer(
  productState,
  on(ProductsActions.loadProductsSuccess, (state: ProductState, payload) => {
    return {
      ...state,
      products: payload?.products,
      currentProduct: {} as IProduct,
      searchQuery: '',
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

  on(ProductsActions.productSearchTermHandler, (state, payload) => {
    const searchQueryResult = state?.products?.filter(
      (item) => item?.title === payload?.query
    )[0];
    const category = state.products.filter(
      (item) => item.category.type.toLowerCase() === payload.query.toLowerCase()
    );
    if (searchQueryResult) {
      return {
        ...state,
        searchQuery: searchQueryResult.product_id || '',
        currentProduct: searchQueryResult,
        products: [...category],
      };
    }
    if (category) {
      return {
        ...state,
        products: [...category],
      };
    } else {
      return { ...state };
    }

    // const searchResultByTitle = state.products.filter(
    //   (item) => item.title === payload.query
    // )[0];
    // const searchResultByCategories = state.products.filter(
    //   (item) => item.category.type.toLowerCase() === payload.query.toLowerCase()
    // );
    // return {
    //   ...state,
    //   searchQuery: searchResultByTitle?.product_id,
    //   currentProduct: searchResultByTitle,
    //   // products: [...searchResultByCategories],
    // };
  }),
  on(ProductsActions.toggleFavorite, (state, payload) => {
    return {
      ...state,
      products: state?.products?.map((pr) => {
        return pr.product_id === payload.id
          ? { ...pr, favorite: !pr.favorite }
          : pr;
      }),
      wishlist: state.wishlist.includes(payload.id)
        ? state.wishlist.filter((id) => id !== payload.id)
        : [...state.wishlist, payload.id],
      currentProduct: {
        ...state.currentProduct,
        favorite: !state.currentProduct?.favorite,
      },
    };
  })
);
