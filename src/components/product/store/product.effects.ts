import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { EMPTY, of } from 'rxjs';
import {
  catchError,
  finalize,
  map,
  mergeMap,
  switchMap,
  withLatestFrom,
} from 'rxjs/operators';
import { IProduct } from '../../../models/product.model';
import { HttpService } from '../../../services/http.service';
import { LocalStorageService } from '../../../services/localStorage.service';
import { loadingSpinner, showMessage } from '../../../store/actions';
import { STATIC_URLS } from '../../../utils';
import { ProductsActions } from './product.actions';
import { selectProducts, selectQueryChanged } from './product.selector';

export const loadProducts$ = createEffect(
  (
    actions$ = inject(Actions),
    http = inject(HttpService),
    store = inject(Store),
    localStorage = inject(LocalStorageService)
  ) =>
    actions$.pipe(
      ofType(ProductsActions.loadProducts),
      switchMap(() =>
        http.get<{ products: IProduct[] }>(STATIC_URLS.GETALLPRODUCTS)
      ),
      map((items: { products: IProduct[] }) => {
        // localStorage.set('products', JSON.stringify(items.products));
        return ProductsActions.loadProductsSuccess({
          products: items.products,
        });
      }),
      catchError(() => {
        return EMPTY;
      }),
      finalize(() => store.dispatch(loadingSpinner({ status: false })))
    ),
  { functional: true }
);

export const loadProduct$ = createEffect(
  (actions$ = inject(Actions), store = inject(Store)) =>
    actions$.pipe(
      ofType(ProductsActions.getCurrentProduct),
      withLatestFrom(store.select(selectProducts)),
      map((data) => {
        const currentProduct = data[1].find(
          (product: IProduct) =>
            product?.product_id?.toString() === data[0]?.productId
        );
        if (currentProduct) {
          return ProductsActions.getCurrentProductSuccess({
            currentProduct,
          });
        } else {
          return showMessage({ message: 'load product error' });
        }
      }),
      catchError(() => EMPTY),
      finalize(() => store.dispatch(loadingSpinner({ status: false })))
    ),

  { functional: true }
);

export const deleteProduct$ = createEffect(
  (
    actions$ = inject(Actions),
    http = inject(HttpService),
    store = inject(Store)
  ) =>
    actions$.pipe(
      ofType(ProductsActions.deleteProduct),
      mergeMap((product) => {
        console.log(product);
        return http
          .delete<IProduct>(
            STATIC_URLS.DELETEORUPDATEPRODUCT,
            product.product_id
          )
          .pipe(
            map(() => {
              return ProductsActions.deleteProductSuccess();
            })
          );
      }),
      catchError(() => of(showMessage({ message: 'delete product error' }))),
      finalize(() => store.dispatch(loadingSpinner({ status: false })))
    ),

  { functional: true }
);

// TODO: UPDATE EDITED VALUES ONLY!
export const updateProduct$ = createEffect(
  (
    actions$ = inject(Actions),
    http = inject(HttpService),
    store = inject(Store)
  ) =>
    actions$.pipe(
      ofType(ProductsActions.updateProduct),
      mergeMap((product) =>
        http
          .put<IProduct, IProduct>(
            STATIC_URLS.DELETEORUPDATEPRODUCT,
            product.product,
            product.product.product_id
          )
          .pipe(
            map(() => {
              return ProductsActions.updateProductSuccess();
            })
          )
      ),

      catchError(() => {
        return of(showMessage({ message: 'update product error' }));
      }),
      finalize(() => store.dispatch(loadingSpinner({ status: false })))
    ),

  { functional: true }
);

export const addProduct$ = createEffect(
  (
    actions$ = inject(Actions),
    http = inject(HttpService),
    store = inject(Store)
  ) =>
    actions$.pipe(
      ofType(ProductsActions.addProduct),
      switchMap((product) => {
        console.log(product);
        return http
          .post<IProduct, FormData>(product.product, STATIC_URLS.ADDPRODUCT)
          .pipe(
            map(() => ProductsActions.addProductSuccess())
          );
      }),

      catchError(() => of(showMessage({ message: 'update product error' }))),
      finalize(() => store.dispatch(loadingSpinner({ status: false })))
    ),

  { functional: true }
);

export const searchProduct$ = createEffect(
  (actions$ = inject(Actions), store = inject(Store)) =>
    actions$.pipe(
      ofType(ProductsActions.queryChanged),
      withLatestFrom(
        store.select(selectQueryChanged),
        store.select(selectProducts)
      ),
      switchMap(([_, query, products]) => {
        return of(ProductsActions.queryChangedSuccess({ products }));
      }),
      catchError(() => EMPTY),
      finalize(() => store.dispatch(loadingSpinner({ status: false })))
    ),

  { functional: true }
);

// export const realoadProducts$ = createEffect(
//   (actions$ = inject(Actions)) => {
//     return actions$.pipe(
//       ofType(ProductsActions.updateProductSuccess),
//       exhaustMap(() => of(ProductsActions.loadProducts()))
//     );
//   },
//   { functional: true, dispatch: false }
// );

export const addToFavorite$ = createEffect(
  (
    actions$ = inject(Actions),
    http = inject(HttpService),
    store = inject(Store)
  ) =>
    actions$.pipe(
      ofType(ProductsActions.toggleFavorite),
      switchMap((item) => {
        console.log(item);
        // localStorage.set('cart', JSON.stringify(item.product));
        return of(showMessage({ message: 'added to wishlist!' }));
      }),
      // switchMap(() => {
      //   return http.get<ICategoryRes>(STATIC_URLS.GETALLCATEGORIES).pipe(
      //     map((categories) => {
      //       return CategoryActions.getCategoriesSuccess({ categories });
      //     })
      //   );
      // }),
       catchError(() => {
         return of(showMessage({ message: 'load categories error' }));
       }),
    ),
  { functional: true, useEffectsErrorHandler: false }
);

