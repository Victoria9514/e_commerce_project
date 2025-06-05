import { inject } from '@angular/core';
import { IUser } from '@models/user.model';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { HttpService } from '@services/http.service';
import { catchError, map, mergeMap, of, tap } from 'rxjs';
import { STATIC_URLS } from '../../utils';
import { loadingSpinner, showMessage } from '../actions/shared.actions';
import { updateAvatar, updateAvatarSuccess } from '../actions/user.actions';

export const updateAvatar$ = createEffect(
  (
    actions$ = inject(Actions),
    http = inject(HttpService),
    store = inject(Store)
  ) =>
    actions$.pipe(
      ofType(updateAvatar),
      tap(() => store.dispatch(loadingSpinner({ status: true }))),
      mergeMap((payload) => {
        console.log(payload, 'PAYLOAD');
        return http
          .put<{ user: IUser; message: string }, FormData>(
            STATIC_URLS.UPDATEAVATAR,
            payload.userData
          )
          .pipe(
            map((data) => {
              return updateAvatarSuccess({
                message: data.message,
                user: data?.user,
              });
            })
          );
      }),
      catchError(() => {
        return of(showMessage({ message: 'avatar update error' }));
      }),
      tap(() => store.dispatch(loadingSpinner({ status: false })))
    ),
  { functional: true }
);
