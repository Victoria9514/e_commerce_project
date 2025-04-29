import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { LocalStorageService } from '@services/localStorage.service';
import { SharedService } from '@services/shared.service';
import { catchError, of, switchMap, tap } from 'rxjs';
import { loadingSpinner, showMessage } from '../../../shared/spinner/store/shared.actions';
import { CartActions } from './cart.actions';

export const addCartItem$ = createEffect(
  (
    actions$ = inject(Actions),
    localStorage = inject(LocalStorageService),
    store = inject(Store)
  ) =>
    actions$.pipe(
      ofType(CartActions.addCartItem),
      tap(() => store.dispatch(loadingSpinner({ status: true }))),
      switchMap((item) => {
        console.log(item);
        // localStorage.set('cart', JSON.stringify(item.product));
        return of(CartActions.addCartItemSuccess());
      }),
      // switchMap(() => {
      //   console.log(newCategory);
      //   return http
      //     .post<ICategoryRes, ICategory>(newCategory, STATIC_URLS.ADDCATEGORY)
      //     .pipe(
      //       map((category) => {
      //         console.log(category);
      //         return CategoryActions.addCategorySuccess();
      //       })
      //     );
      // }),
      catchError(() => {
        return of(showMessage({ message: 'unable to add cart item' }));
      }),
      tap(() => store.dispatch(loadingSpinner({ status: false })))
    ),
  { functional: true, useEffectsErrorHandler: false }
);


export const deleteCartItem$ = createEffect(
  (
    actions$ = inject(Actions),
    localStorage = inject(LocalStorageService),
    store = inject(Store),
    snackBar = inject(SharedService)
  ) =>
    actions$.pipe(
      ofType(CartActions.deleteCartItem),
      tap(() => store.dispatch(loadingSpinner({ status: true }))),
      switchMap((item) => {
        // snackBar.handleSnackBar({
        //   msg: `${item.id ? }`
        // })
        console.log(item);
        // localStorage.set('cart', JSON.stringify(item.product));
        return of(CartActions.deleteCartItemSuccess());
      }),
      // switchMap(() => {
      //   console.log(newCategory);
      //   return http
      //     .post<ICategoryRes, ICategory>(newCategory, STATIC_URLS.ADDCATEGORY)
      //     .pipe(
      //       map((category) => {
      //         console.log(category);
      //         return CategoryActions.addCategorySuccess();
      //       })
      //     );
      // }),
      catchError(() => {
        return of(showMessage({ message: 'unable to delete cart item' }));
      }),
      tap(() => store.dispatch(loadingSpinner({ status: false })))
    ),
  { functional: true, useEffectsErrorHandler: false }
);
