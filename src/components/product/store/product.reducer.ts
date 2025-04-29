import { IProduct } from '@models/product.model';
import { createReducer, on } from '@ngrx/store';
import { ProductsActions } from './product.actions';

export interface ProductState {
  products: IProduct[];
  currentProduct: IProduct;
  filteredProducts: null | IProduct[];
  deletedProductId: string;
  wishlist: string[];
  searchQuery: string;
  searchProductResults: IProduct[];
}

export const productState: ProductState = {
  products: [],
  currentProduct: {} as IProduct,
  filteredProducts: null,
  deletedProductId: '',
  wishlist: [],
  searchQuery: '',
  searchProductResults: [],
};

export const productReducer = createReducer(
  productState,
  on(ProductsActions.loadProductsSuccess, (state: ProductState, payload) => {
    return {
      ...state,
      products: payload?.products,
      currentProduct: {} as IProduct,
      searchQuery: '', // should be in shared store
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
  // on(ProductsActions.navigateToToGender, (state: ProductState, payload) => {
  //   return {
  //     ...state,
  //     filteredProducts: state.products?.filter(
  //       (g) => g?.gender === payload?.gender
  //     ),
  //   };
  // }),
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
  on(ProductsActions.filterProduct, (state, payload) => {
    return {
      ...state,
      products: state.products.filter(
        (pr) => pr[payload.prop] === payload.value
      )
        ? state.products.filter((pr) => pr[payload.prop] === payload.value)
        : state.products,
    };
  }),

  on(ProductsActions.handleProductQueryChange, (state, payload) => {
    const currentProduct = state.products.filter(
      (item) => item.title === payload.query
    );
    const category = state.products.filter(
      (item) => item.category.type.toLowerCase() === payload.query.toLowerCase()
    );

    console.log(currentProduct, category);
    return {
      ...state,
      searchQuery: currentProduct[0]?.product_id,
      products: [...category]
    };
  }),
  // on(ProductsActions.queryChanged, (state, payload) => {
  //   return {
  //     ...state,
  //     searchQuery: payload.query,
  //   };
  // }),
  // on(ProductsActions.queryChangedSuccess, (state, payload) => {
  //   return {
  //     ...state,
  //     searchProductResults: payload.products.filter((pr) => {
  //       return (
  //         pr.title.toLowerCase().includes(state.searchQuery.toLowerCase()) ||
  //         pr.title.toLowerCase().startsWith(state.searchQuery.toLowerCase())
  //       );
  //     }),
  //   };
  // }),
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
  }),
  on(ProductsActions.deleteProductItemFromWishlist, (state, payload) => {
    return {
      ...state,
      wishlist: state.wishlist.filter((id) => id !== payload.id),
    };
  })
);
