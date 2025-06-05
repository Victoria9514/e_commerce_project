import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { EMPTY, catchError, of, switchMap, tap } from 'rxjs';
import { loadingSpinner, showMessage } from 'src/store/actions/shared.actions';
import { FilterActions } from '../actions/filter.actions';

export const filterProducts$ = createEffect(
  (actions$ = inject(Actions), store = inject(Store)) =>
    actions$.pipe(
      ofType(FilterActions.filterBy),
      tap(() => store.dispatch(loadingSpinner({ status: true }))),
      switchMap((products) => {
        console.log(products);
        return EMPTY;
      }),

      catchError(() => of(showMessage({ message: 'update product error' }))),
      tap(() => store.dispatch(loadingSpinner({ status: false })))
    ),
  { functional: true }
);

export const submitFilter$ = createEffect(
  (actions$ = inject(Actions), store = inject(Store)) =>
    actions$.pipe(
      ofType(FilterActions.submitFilterSelector),
      tap(() => store.dispatch(loadingSpinner({ status: true }))),
      switchMap(() => {
        return of(FilterActions.submitFilterSelectorSuccess());
      }),

      catchError(() => of(showMessage({ message: 'unable to submit filter' }))),
      tap(() => store.dispatch(loadingSpinner({ status: false })))
    ),
  { functional: true }
);
