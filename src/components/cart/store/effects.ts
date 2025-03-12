import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { catchError, finalize, of, switchMap } from 'rxjs';
import { LocalStorageService } from '../../../services/localStorage.service';
import { loadingSpinner, showMessage } from '../../../store/actions';
import { CartActions } from './actions';

export const addCartItem$ = createEffect(
  (
    actions$ = inject(Actions),
    localStorage = inject(LocalStorageService),
    store = inject(Store)
  ) =>
    actions$.pipe(
      ofType(CartActions.addCartItem),
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
      finalize(() => store.dispatch(loadingSpinner({ status: false })))
    ),
  { functional: true, useEffectsErrorHandler: false }
);
