import { Component, ViewEncapsulation, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { AuthActions } from '../store/auth.actions';
import { LoginComponent } from './login/login.component';

@Component({
  selector: 'app-login-page',
  imports: [LoginComponent],
  templateUrl: './login-page.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrl: './login-page.component.scss',
})
export class LoginPageComponent {
  store = inject(Store);

  logIn(
    loginForm: Partial<{ username: string | null; password: string | null }>
  ) {
    if (
      loginForm &&
      typeof loginForm['username'] === 'string' &&
      typeof loginForm['password'] === 'string'
    ) {
      this.store.dispatch(
        AuthActions.login({
          username: loginForm['username'],
          password: loginForm['password'],
        })
      );
    }
  }
}
