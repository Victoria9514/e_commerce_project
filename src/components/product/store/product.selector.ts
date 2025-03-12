import { createSelector } from '@ngrx/store';
import { IProduct, Product } from '../../../models/product.model';
import { AppState } from '../../../models/states.models';
import { selectAppState } from '../../../store/selectors';
import { ProductState } from './product.reducer';

export const selectProductState = createSelector(
  selectAppState,
  (appState: AppState) => appState?.productsState
);

export const selectProducts = createSelector(
  selectProductState,
  (state: ProductState) => state?.products || []
);
export const selectProductsLength = createSelector(
  selectProducts,
  (state: IProduct[]) => state?.length || 0
);
export const selectCurrentProduct = createSelector(
  selectProductState,
  (state: ProductState) => state?.currentProduct
);

// TODO FIX THIS AND GET ONLY FIRST ITEM
export const selectTitleProductImage = createSelector(
  selectProducts,
  (state: IProduct[]) => state?.map((item: Product) => item.images_name)
);

export const selectFilteredProducts = createSelector(
  selectProductState,
  (state: ProductState) => state?.filteredProducts
);

export const selectProductPropsForTable = createSelector(
  selectProducts,
  (products: IProduct[]) =>
    products.map((product) => new Product(product) || {})
);

export const selectProductPropsForColumnTable = createSelector(
  selectProductPropsForTable,
  (columns) => {
    if (columns[0]) return Object?.keys(columns[0]);
    else return [];
  }
);

export const selectQueryChanged = createSelector(
  selectProductState,
  (state: ProductState) => state?.searchQuery
);

export const selectSearchQueryResults = createSelector(
  selectProductState,
  (state: ProductState) =>
    state?.searchProductResults?.map((item) => item?.title)
);

export const selectSearchQueryResults1 = createSelector(
  selectProductState,
  (state: ProductState) =>
    state?.searchProductResults.map((item) => item?.title)
);

export const selectAllTitles = createSelector(
  selectProducts,
  (product: IProduct[]) => product.map((pr) => pr?.title)
);

export const selectWishlist = createSelector(
  selectProductState,
  (state: ProductState) => state?.wishlist || []
);

export const selectWishlistItems = createSelector(
  selectProducts,
  selectWishlist,
  (products: IProduct[], wishlist: string[]) =>
    products?.filter((pr: IProduct) =>
      wishlist.find((id) => id === pr.product_id)
    )
);
