import { inject } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ICategory, Size } from '@models/states.models';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { HttpService } from '@services/http.service';
import { catchError, map, of, switchMap, tap } from 'rxjs';
import { STATIC_URLS } from '../../../utils';
import {
  loadingSpinner,
  openSnackBar,
  sharedActions,
  showMessage,
} from './shared.actions';

export const getCategories$ = createEffect(
  (
    actions$ = inject(Actions),
    http = inject(HttpService),
    store = inject(Store)
  ) =>
    actions$.pipe(
      ofType(sharedActions.getCategories),

      tap(() => store.dispatch(loadingSpinner({ status: true }))),
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
      tap(() => store.dispatch(loadingSpinner({ status: false })))
    ),
  { functional: true, useEffectsErrorHandler: false }
);

export const getSizes$ = createEffect(
  (
    actions$ = inject(Actions),
    http = inject(HttpService),
    store = inject(Store)
  ) =>
    actions$.pipe(
      ofType(sharedActions.getSizes),

      tap(() => store.dispatch(loadingSpinner({ status: true }))),
      switchMap(() => {
        return http
          .get<{ message: string; sizes: Array<Size> }>(STATIC_URLS.GETALLSIZES)
          .pipe(
            map((data) => sharedActions.getSizesSuccess({ sizes: data.sizes }))
          );
      }),
      catchError(() => {
        return of(showMessage({ message: 'load sizes error' }));
      }),
      tap(() => store.dispatch(loadingSpinner({ status: false })))
    ),
  { functional: true, useEffectsErrorHandler: false }
);

export const openSnackBar$ = createEffect(
  (actions$ = inject(Actions), snackBar = inject(MatSnackBar)) =>
    actions$.pipe(
      ofType(openSnackBar),
      map((action) => {
        if (typeof action.payload === 'string') {
          snackBar.open(action.payload);
        } else {
          if (action.payload.type === 'ERROR') {
            snackBar.open(action.payload.message, '', {
              duration: action.payload.duration
                ? action.payload.duration
                : 2000,
              panelClass: 'rtl-warn-snack-bar',
            });
          } else if (action.payload.type === 'WARN') {
            snackBar.open(action.payload.message, '', {
              duration: action.payload.duration
                ? action.payload.duration
                : 2000,
              panelClass: 'rtl-accent-snack-bar',
            });
          } else {
            snackBar.open(action.payload.message, '', {
              duration: action.payload.duration
                ? action.payload.duration
                : 2000,
              panelClass: 'rtl-snack-bar',
            });
          }
        }
      })
    ),

  { functional: true, useEffectsErrorHandler: false, dispatch: false }
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
//       tap(() => store.dispatch(loadingSpinner({ status: false })))
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

      tap(() => store.dispatch(loadingSpinner({ status: true }))),
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
      tap(() => store.dispatch(loadingSpinner({ status: false })))
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

      tap(() => store.dispatch(loadingSpinner({ status: true }))),
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
      tap(() => store.dispatch(loadingSpinner({ status: false })))
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
