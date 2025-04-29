import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { AuthService } from '@services/auth.service';
import { catchError, map, of, switchMap, tap } from 'rxjs';
import {
  loadingSpinner,
  showMessage,
} from '../../../shared/spinner/store/shared.actions';
import { AuthActions } from './auth.actions';

export const login$ = createEffect(
  (
    actions$ = inject(Actions),
    authService = inject(AuthService),
    store = inject(Store)
  ) =>
    actions$.pipe(
      ofType(AuthActions.login),
      tap(() => store.dispatch(loadingSpinner({ status: true }))),
      switchMap((payload) =>
        authService
          .login(payload.username, payload.password)
          .pipe(map((user) => AuthActions.loginUserSuccess({ user })))
      ),
      catchError(() => of(showMessage({ message: 'login error' }))),
      tap(() => store.dispatch(loadingSpinner({ status: false })))
    ),
  { functional: true, useEffectsErrorHandler: false }
);

export const register$ = createEffect(
  (
    actions$ = inject(Actions),
    authService = inject(AuthService),
    store = inject(Store)
  ) =>
    actions$.pipe(
      ofType(AuthActions.registerUser),

      tap(() => store.dispatch(loadingSpinner({ status: true }))),
      switchMap((payload) => {
        return authService.register(payload.user).pipe(
          map((user) =>
            AuthActions.registerUserSuccess({
              user,
            })
          )
        );
      }),
      catchError(() => {
        return of(showMessage({ message: 'register error' }));
      }),
      tap(() => store.dispatch(loadingSpinner({ status: false })))
    ),
  { functional: true, useEffectsErrorHandler: false }
);

export const redirect$ = createEffect(
  (
    actions$ = inject(Actions),
    router = inject(Router),
    store = inject(Store)
  ) =>
    actions$.pipe(
      ofType(
        ...[AuthActions.loginUserSuccess, AuthActions.registerUserSuccess]
      ),
      tap((user) => {
        store.dispatch(loadingSpinner({ status: true }));
        localStorage.setItem('user', JSON.stringify(user.user));
        router.navigate(['/main']);
      }),
      tap(() => store.dispatch(loadingSpinner({ status: false })))
    ),

  { functional: true, dispatch: false }
);
