import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { IProduct } from '@models/product.model';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { HttpService } from '@services/http.service';
import { SharedService } from '@services/shared.service';
import { EMPTY, of } from 'rxjs';
import {
  catchError,
  map,
  mergeMap,
  retry,
  switchMap,
  tap,
  withLatestFrom,
} from 'rxjs/operators';
import { STATIC_URLS } from '../../utils';
import { ProductsActions } from '../actions/product.actions';
import {
  loadingSpinner,
  openSnackBar,
  showMessage,
} from '../actions/shared.actions';
import { selectProducts, selectSearchTerm } from '../selectors/product.selectors';

export const loadProducts$ = createEffect(
  (
    actions$ = inject(Actions),
    http = inject(HttpService),
    store = inject(Store)
  ) =>
    actions$.pipe(
      ofType(ProductsActions.loadProducts),
      tap(() => store.dispatch(loadingSpinner({ status: true }))),
      switchMap(() =>
        http.get<{ products: IProduct[] }>(STATIC_URLS.GETALLPRODUCTS)
      ),
      map((items: { products: IProduct[] }) => {
        return ProductsActions.loadProductsSuccess({
          products: items.products,
        });
      }),
      catchError(() => EMPTY),
      tap(() => store.dispatch(loadingSpinner({ status: false })))
    ),
  { functional: true }
);

export const loadProduct$ = createEffect(
  (actions$ = inject(Actions), store = inject(Store)) =>
    actions$.pipe(
      ofType(ProductsActions.getCurrentProduct),
      tap(() => store.dispatch(loadingSpinner({ status: true }))),
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
      tap(() => store.dispatch(loadingSpinner({ status: false })))
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
      tap(() => store.dispatch(loadingSpinner({ status: true }))),
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
      tap(() => store.dispatch(loadingSpinner({ status: false })))
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
      tap(() => store.dispatch(loadingSpinner({ status: true }))),
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
      tap(() => store.dispatch(loadingSpinner({ status: false })))
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
      tap(() => store.dispatch(loadingSpinner({ status: true }))),
      switchMap((product) => {
        return http
          .post<IProduct, FormData>(product.product, STATIC_URLS.ADDPRODUCT)
          .pipe(
            tap(() =>
              store.dispatch(
                openSnackBar({
                  payload: `
                   'The product has been added successfully`,
                })
              )
            ),
            map(() => ProductsActions.addProductSuccess())
          );
      }),
      catchError(() => of(showMessage({ message: 'update product error' }))),
      tap(() => store.dispatch(loadingSpinner({ status: false })))
    ),

  { functional: true }
);

// export const searchProduct$ = createEffect(
//   (actions$ = inject(Actions), store = inject(Store)) =>
//     actions$.pipe(
//       ofType(ProductsActions.queryChanged),
//       withLatestFrom(
//         store.select(selectQueryChanged),
//         store.select(selectProducts)
//       ),
//       switchMap(([_, query, products]) => {
//         return of(ProductsActions.queryChangedSuccess({ products }));
//       }),
//       catchError(() => EMPTY),
//       tap(() => store.dispatch(loadingSpinner({ status: false })))
//     ),

//   { functional: true }
// );

export const toggleFavorite$ = createEffect(
  (
    actions$ = inject(Actions),
    store = inject(Store),
    snackBar = inject(SharedService)
  ) =>
    actions$.pipe(
      retry(3),
      ofType(ProductsActions.toggleFavorite),
      tap(() => store.dispatch(loadingSpinner({ status: true }))),
      switchMap((item) => {
        store.dispatch(
          openSnackBar({
            payload: `${
              item.inWishlist ? 'removed from wishlish' : 'added to wishlist'
            }`,
          })
        );
        return of(showMessage({ message: '' }));
      }),
      catchError(() => {
        return of(
          openSnackBar({
            payload: {
              message: 'error occured when try to add/remove item in wishlist',
              type: 'Error',
            },
          })
        );
      })
    ),
  { functional: true, useEffectsErrorHandler: false }
);

export const productSearchTermHandler$ = createEffect(
  (
    actions$ = inject(Actions),
    store = inject(Store),
    router = inject(Router)
  ) =>
    actions$.pipe(
      ofType(ProductsActions.productSearchTermHandler),
      withLatestFrom(store.select(selectSearchTerm)),
      tap((data) => {
        console.log(data);
        store.dispatch(loadingSpinner({ status: true }));
        if (data[1]) router.navigate([`/p/${data[1]}`]);
      }),
      catchError(() =>
        of(showMessage({ message: 'unable to load that product' }))
      ),
      tap(() => store.dispatch(loadingSpinner({ status: false })))
    ),
  { functional: true, dispatch: false }
);
