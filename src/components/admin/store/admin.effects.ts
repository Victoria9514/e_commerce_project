import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { catchError, finalize, map, mergeMap, of } from 'rxjs';
import { IUser, UserTableModel } from '../../../models/user.model';
import { HttpService } from '../../../services/http.service';
import { LocalStorageService } from '../../../services/localStorage.service';
import { loadingSpinner, showMessage } from '../../../store/actions';
import { STATIC_URLS } from '../../../utils';
import { AdminActions } from './admin.actions';

export const loadUsers$ = createEffect(
  (
    actions$ = inject(Actions),
    http = inject(HttpService),
    store = inject(Store),
    localStorage = inject(LocalStorageService)
  ) =>
    actions$.pipe(
      ofType(AdminActions.loadUsers),
      mergeMap(() =>
        http.get<{ users: UserTableModel[]; message: string }>(
          STATIC_URLS.GETALLUSERSADMIN
        )
      ),
      map((users) => {
        localStorage.set('users', JSON.stringify(users.users));
        return AdminActions.loadUsersSuccess({ users: users.users });
      }),
      catchError(() => {
        return of(showMessage({ message: 'Unable to load users' }));
      }),
      finalize(() => store.dispatch(loadingSpinner({ status: false })))
    ),
  { functional: true }
);

export const deleteUser$ = createEffect(
  (
    actions$ = inject(Actions),
    http = inject(HttpService),
    store = inject(Store)
  ) =>
    actions$.pipe(
      ofType(AdminActions.deleteUser),
      mergeMap((user) =>
        http
          .delete(STATIC_URLS.DELETEORUPDATEUSER, user.user_id)
          .pipe(
            map(() => {
              return AdminActions.deleteUsersSuccess();
            })
          )
      ),
      catchError(() => {
        return of(showMessage({ message: 'Unable to delete users' }));
      }),
      finalize(() => store.dispatch(loadingSpinner({ status: false })))
    ),
  { functional: true }
);

export const updateUser$ = createEffect(
  (
    actions$ = inject(Actions),
    http = inject(HttpService),
    store = inject(Store)
  ) =>
    actions$.pipe(
      ofType(AdminActions.updateUser),
      // TODO: FIX THIS => GET USER ID ONLY!!!
      mergeMap((user) =>
        http
          .put<IUser, number>(STATIC_URLS.DELETEORUPDATEUSER, user.user.user_id)
          .pipe(
            map(() => {
              return AdminActions.updateUsersSuccess();
            })
          )
      ),
      catchError(() =>  of(showMessage({ message: 'Unable to update users' }))),
      finalize(() => store.dispatch(loadingSpinner({ status: false })))
    ),
  { functional: true }
);
