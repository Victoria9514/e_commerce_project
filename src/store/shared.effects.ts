import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { catchError, finalize, map, of, switchMap } from 'rxjs';
import { ICategory } from '../models/states.models';
import { HttpService } from '../services/http.service';
import { STATIC_URLS } from '../utils';
import { loadingSpinner, sharedActions, showMessage } from './shared.actions';

export const getCategories$ = createEffect(
  (
    actions$ = inject(Actions),
    http = inject(HttpService),
    store = inject(Store)
  ) =>
    actions$.pipe(
      ofType(sharedActions.getCategories),
      switchMap(() => {
        return http
          .get<{ message: string; categories: ICategory[] }>(
            STATIC_URLS.GETALLCATEGORIES
          )
          .pipe(
            map((data) =>
              sharedActions.getCategoriesSuccess({
                categories: data.categories,
              })
            )
          );
      }),
      catchError(() => {
        return of(showMessage({ message: 'load categories error' }));
      }),
      finalize(() => store.dispatch(loadingSpinner({ status: false })))
    ),
  { functional: true, useEffectsErrorHandler: false }
);

// export const getSubCategories$ = createEffect(
//   (
//     actions$ = inject(Actions),
//     http = inject(HttpService),
//     store = inject(Store)
//   ) =>
//     actions$.pipe(
//       ofType(sharedActions.getSubCategories),
//       switchMap(() => {
//         return http
//           .get<{ message: string; children: ICategory[] }>(
//             STATIC_URLS.GETALLSUBCATEGORIES
//           )
//           .pipe(
//             map((data) =>
//               sharedActions.getSubCategoriesSuccess({
//                 children: data.children,
//               })
//             )
//           );
//       }),
//       catchError(() => {
//         return of(showMessage({ message: 'load sub_categories error' }));
//       }),
//       finalize(() => store.dispatch(loadingSpinner({ status: false })))
//     ),

//   { functional: true, useEffectsErrorHandler: false }
// );

export const addCategory$ = createEffect(
  (
    actions$ = inject(Actions),
    http = inject(HttpService),
    store = inject(Store)
  ) =>
    actions$.pipe(
      ofType(sharedActions.addCategory),
      switchMap(({ newCategory }) => {
        console.log(newCategory);
        return http
          .post<ICategory, ICategory>(newCategory, STATIC_URLS.ADDCATEGORY)
          .pipe(
            map((category) => {
              console.log(category);
              return sharedActions.addCategorySuccess();
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
      ofType(sharedActions.addSubCategory),
      switchMap(({ newSubCategory }) => {
        return http
          .post<ICategory, ICategory>(
            newSubCategory,
            STATIC_URLS.ADDSUBCATEGORY
          )
          .pipe(
            map((children) => {
              console.log(children);
              return sharedActions.addSubCategorySuccess();
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

// export const loadProductsNavigtation$ = createEffect(
//   (actions$ = inject(Actions), store = inject(Store),http = inject(HttpService)) =>
//     actions$.pipe(
//       ofType(ProductsActions.loadProductsSuccess),
//       switchMap((products) => {
//         return http.get<ICategoryRes>(STATIC_URLS.GETALLCATEGORIES).pipe(
//           map((cate))
//         )
//         const nodes = Utils.transformProductToNodes(products.products);
//         console.log(nodes)
//         return of(sharedActions.loadSideBarNavigationSucces({nodes}))
//       }),
//       catchError(() => {
//         return of(
//           showMessage({ message: 'unable to load sibe-bar navigation' })
//         );
//       }),
//       finalize(() => store.dispatch(loadingSpinner({ status: false })))
//     ),
//   { functional: true }
// );

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
