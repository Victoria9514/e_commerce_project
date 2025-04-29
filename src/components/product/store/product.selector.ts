import { IProduct, Product } from '@models/product.model';
import { AppState } from '@models/states.models';
import { createSelector } from '@ngrx/store';
import { Utils } from 'src/utils';
import { selectAppState } from '../../../shared/spinner/store/shared.selectors';
import { ProductState } from './product.reducer';

export const selectProductState = createSelector(
  selectAppState,
  (appState: AppState) => appState?.productState
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

// export const selectSearchQueryResults = createSelector(
//   selectProductState,
//   (state: ProductState) =>
//     state?.searchProductResults?.map((item) => item?.title)
// );

// export const selectSearchQueryResults1 = createSelector(
//   selectProductState,
//   (state: ProductState) =>
//     state?.searchProductResults.map((item) => item?.title)
// );

export const selectSearchQueryOptions = createSelector(
  selectProducts,
  (product: IProduct[]) => {
    const data: string[] = [];
    product.forEach((pr) => {
      data.push(pr.title.toLowerCase(), pr.category.type.toLowerCase());
    });
    return data;
  }
);

export const selectWishlist = createSelector(
  selectProductState,
  (state: ProductState) => state?.wishlist || []
);

export const selectWishlistItems = createSelector(
  selectProducts,
  selectWishlist,
  (products, wishlist) => Utils.selectFilteredItems(products, wishlist)
);
