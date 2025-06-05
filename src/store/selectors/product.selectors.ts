import { AppState } from '@models/app.store.models';
import { FilterOptions } from '@models/filter.models';
import { IProduct, Product } from '@models/product.model';
import { createSelector } from '@ngrx/store';
import {
  selectFilterBy,
  selectFilterSelectors,
} from 'src/store/selectors/filter.selectors';
import { selectNavigationSelector } from 'src/store/selectors/navigation.selectors';
import { selectAppState } from 'src/store/selectors/shared.selectors';
import { Utils } from 'src/utils';
import { ProductState } from '../reducers/product.reducer';

export const selectProductState = createSelector(
  selectAppState,
  (appState: AppState) => appState?.productState
);

export const selectProducts = createSelector(
  selectProductState,
  (state: ProductState) => state?.products || []
);

export const selectFilterProducts = createSelector(
  selectProducts,
  selectNavigationSelector,
  selectFilterSelectors,
  (products: IProduct[], nav, filterSelector) => {
    if (nav[0].navLink !== '') {
      return products?.filter((pr) =>
        nav?.find((navdata) => {
          if (navdata.navLink === FilterOptions.GENDER)
            return (
              pr[navdata?.navLink]?.toLowerCase() === navdata?.value?.toString()
            );
          if (navdata.navLink === FilterOptions.CATEGORY)
            return navdata?.value?.some(
              (value) => value === pr[navdata?.navLink]
            );
          else {
            return [...products];
          }
        })
      );
    }
    if (filterSelector.values.length > 0) {
      const d = [...products.filter((pr) =>
        filterSelector.find((selectedItems) =>
          selectedItems.values.find((id) => id === pr.product_id)
        )
      )];
      console.log(d);
      return d;
    } else {
      return [...products];
    }
  }
);
// if (nav[0].navLink !== '') {
//   const d = [
//     ...products.filter(
//       (pr) =>
//         nav[0].value?.toString().toLowerCase() === pr[nav[0].navLink.toLowerCase()]
//     ),
//   ];
//   console.log(d)
//   return d;
// } else [...products];
// console.log(nav)
// return [...products];
// prop: keyof IProduct,
// query: string[] | string,
//isSubmitted: boolean
// if (typeof query === 'string') {
//   return prState.filter((item) => {
//     return (
//       item?.[prop]?.type?.toLowerCase() === query.toLowerCase() ||
//       item?.[prop]?.toString().toLowerCase() === query.toLowerCase()
//     );
//   });
// } else if (query.length) {
//   return prState.filter((item) =>
//     query.some((value) => {
//       return item[prop]?.type.toLowerCase() === value?.toLowerCase();
//     })
//   );
// }
// if (filterSelector && isSubmitted) {
//   return prState.filter((pr) =>
//     filterSelector.find((data) =>
//       data.values.some((value) => value === pr[data.field])
//     )
//   );
// } else {
// }

// export const selectPriceRangeFilterSelector = createSelector(
//   selectFilterBySelector,
//   (products, filteredProducts) =>
//     filteredProducts?.length
//       ? filteredProducts.filter((pr) => pr.values)
//       : products?.filter((pr) => +pr.price).map((pr) => pr.price)
// );

// export const selectProductFilter = createSelector(
//   selectFilterBy,
//   selectSizes,
//   selectCategories,
//   (filterBy: string, sizes: string[], categories)
// );

// export const selectSortFilterProductActions = createSelector(
//   selectProducts,
//   selectSortBy,
//   selectFilterBy,
//   (state: IProduct[]) => state?.length || 0
// );

export const selectCurrentProduct = createSelector(
  selectProductState,
  (state: ProductState) => state?.currentProduct
);

// TODO FIX THIS AND GET ONLY FIRST ITEM
// export const selectTitleProductImage = createSelector(
//   selectProducts,
//   (state: IProduct[]) => state?.map((item: IProduct) => item?.images_path)
// );

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

export const selectSearchTerm = createSelector(
  selectProductState,
  (state: ProductState) => state?.searchQuery
);

// export const selectSearchQueryResults1 = createSelector(
//   selectProductState,
//   (state: ProductState) =>
//     state?.searchProductResults.map((item) => item?.title)
// );

// export const selectSearchQueryOptions = createSelector(
//   selectProducts,
//   (product) => {
//     const data: string[] = [];
//     product.forEach((pr) =>
//       data.push(pr.title.toLowerCase(), pr.category.type.toLowerCase())
//     );
//     return data;
//   }
// );

// fix this when we alredy applied another filter

// export const selectMaxMinProductPrice = createSelector(
//   selectFilterBy,
//   selectPriceRangeFilter,
//   (filterBy, prices) =>
//     filterBy
//       ? {
//           max: Math.max(...(prices as number[])),
//           min: Math.min(...(prices as number[])),
//         }
//       : { min: 0, max: 0 }
// );

export const selectWishlist = createSelector(
  selectProductState,
  (state: ProductState) => state?.wishlist || []
);

export const selectWishlistItems = createSelector(
  selectProducts,
  selectWishlist,
  (products, wishlist) => Utils.selectFilteredItems(products, wishlist)
);

export const selectFilterSelector = createSelector(
  selectFilterBy,
  selectProducts,
  (query, products) => {
    return products?.map((item) => {
      return {
        prop: item[query.type],
        id: item.product_id,
      };
    });
  }
);
