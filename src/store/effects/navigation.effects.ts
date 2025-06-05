import { ErrorHandler, inject } from '@angular/core';
import { Router } from '@angular/router';
import { FilterOptions } from '@models/filter.models';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { EMPTY, catchError, of, switchMap, tap } from 'rxjs';
import { loadingSpinner } from 'src/store/actions/shared.actions';
import { NavigationActions } from '../actions/navigation.actions';

export const navigate$ = createEffect(
  (
    actions$ = inject(Actions),
    store = inject(Store),
    router = inject(Router),
    errorHandler = inject(ErrorHandler)
  ) =>
    actions$.pipe(
      ofType(NavigationActions.navigate),
      tap((data) => {
        store.dispatch(loadingSpinner({ status: true }));
        console.log(data);
        if (
          data.opt === FilterOptions.GENDER ||
          data.opt === FilterOptions.CATEGORY
        )
          router.navigate([`/c/${data.query?.toString().toLowerCase()}`]);
        // if (data.opt === FilterOptions.CATEGORY)
        //   router.navigate([`/c/${FilterOptions.GENDER}`], {
        //     queryParams: { category: data?.query?.toString()?.toLowerCase() },
        //   });
      }),
      switchMap((data) => {
        console.log(data);
        return of(NavigationActions.navigateSuccess({ data }));
      }),
      catchError(() => {
        errorHandler.handleError(new Error('Navigation error occured'));
        return EMPTY;
      }),
      tap(() => store.dispatch(loadingSpinner({ status: false })))
    ),
  { functional: true }
);
