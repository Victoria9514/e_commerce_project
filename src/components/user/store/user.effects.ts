import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { catchError, finalize, map, mergeMap, of } from 'rxjs';
import { IUser } from '../../../models/user.model';
import { HttpService } from '../../../services/http.service';
import { loadingSpinner, showMessage } from '../../../store/shared.actions';
import { STATIC_URLS } from '../../../utils';
import { updateAvatar, updateAvatarSuccess } from './user.actions';

export const updateAvatar$ = createEffect(
  (
    actions$ = inject(Actions),
    http = inject(HttpService),
    store = inject(Store)
  ) =>
    actions$.pipe(
      ofType(updateAvatar),
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
      finalize(() => store.dispatch(loadingSpinner({ status: false })))
    ),
  { functional: true }
);
