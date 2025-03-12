import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { catchError, finalize, map, of, switchMap } from 'rxjs';
import {
  ICategory,
  ICategoryRes,
  ISubCategory,
  ISubCategoryRes,
} from '../models/states.models';
import { HttpService } from '../services/http.service';
import { STATIC_URLS } from '../utils';
import { CategoryActions, loadingSpinner, showMessage } from './actions';

export const getCategories$ = createEffect(
  (
    actions$ = inject(Actions),
    http = inject(HttpService),
    store = inject(Store)
  ) =>
    actions$.pipe(
      ofType(CategoryActions.getCategories),
      switchMap(() => {
        return http.get<ICategoryRes>(STATIC_URLS.GETALLCATEGORIES).pipe(
          map((categories) => {
            return CategoryActions.getCategoriesSuccess({ categories });
          })
        );
      }),
      catchError(() => {
        return of(showMessage({ message: 'load categories error' }));
      }),
      finalize(() => store.dispatch(loadingSpinner({ status: false })))
    ),
  { functional: true, useEffectsErrorHandler: false }
);

export const getSubCategories$ = createEffect(
  (
    actions$ = inject(Actions),
    http = inject(HttpService),
    store = inject(Store)
  ) =>
    actions$.pipe(
      ofType(CategoryActions.getSubCategories),
      switchMap(() => {
        return http.get<ISubCategoryRes>(STATIC_URLS.GETALLSUBCATEGORIES).pipe(
          map((sub_categories) =>
            CategoryActions.getSubCategoriesSuccess({
              sub_categories,
            })
          )
        );
      }),
      catchError(() => {
        return of(showMessage({ message: 'load sub_categories error' }));
      }),
      finalize(() => store.dispatch(loadingSpinner({ status: false })))
    ),

  { functional: true, useEffectsErrorHandler: false }
);

export const addCategory$ = createEffect(
  (
    actions$ = inject(Actions),
    http = inject(HttpService),
    store = inject(Store)
  ) =>
    actions$.pipe(
      ofType(CategoryActions.addCategory),
      switchMap(({ newCategory }) => {
        console.log(newCategory);
        return http
          .post<ICategoryRes, ICategory>(newCategory, STATIC_URLS.ADDCATEGORY)
          .pipe(
            map((category) => {
              console.log(category);
              return CategoryActions.addCategorySuccess();
            })
          );
      }),
      catchError(() => {
        return of(showMessage({ message: 'add a cateory error' }));
      }),
      finalize(() => store.dispatch(loadingSpinner({ status: false })))
    ),
  { functional: true, useEffectsErrorHandler: false }
);

export const addSubCategory$ = createEffect(
  (
    actions$ = inject(Actions),
    http = inject(HttpService),
    store = inject(Store)
  ) =>
    actions$.pipe(
      ofType(CategoryActions.addSubCategory),
      switchMap(({ newSubCategory }) => {
        console.log(newSubCategory);
        return http
          .post<ISubCategoryRes, ISubCategory>(
            newSubCategory,
            STATIC_URLS.ADDSUBCATEGORY
          )
          .pipe(
            map((sub_category) => {
              console.log(sub_category);
              return CategoryActions.addSubCategorySuccess();
            })
          );
      }),
      catchError(() => {
        return of(showMessage({ message: 'add a cateory error' }));
      }),
      finalize(() => store.dispatch(loadingSpinner({ status: false })))
    ),
  { functional: true, useEffectsErrorHandler: false }
);

// export const changeCategory$ = createEffect(
//   (
//     actions$ = inject(Actions),
//     http = inject(HttpService),
//     store = inject(Store)
//   ) =>
//     actions$.pipe(
//       ofType(CategoryActions.categoryChaged),
//       switchMap(() => {
//         return of(CategoryActions.categoryChagedSuccess());
//       }),
//       catchError(() => {
//         return of(showMessage({ message: 'change a cateory error' }));
//       }),
//       finalize(() => store.dispatch(loadingSpinner({ status: false })))
//     ),
//   { functional: true, useEffectsErrorHandler: false }
// );
