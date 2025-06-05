import { Component, ViewEncapsulation, inject } from '@angular/core';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { RouterModule } from '@angular/router';
import { Store } from '@ngrx/store';
import { ButtonComponent } from 'src/common/button/button.component';
import { AuthActions } from 'src/store/actions/auth.actions';
import { LoginComponent } from '../../auth/login-page/login/login.component';

@Component({
  selector: 'app-account',
  imports: [
    MatFormFieldModule,
    ButtonComponent,
    RouterModule,
    MatIconModule,
    MatDividerModule,
    MatInputModule,
    LoginComponent,
  ],
  templateUrl: './account.component.html',
  styleUrl: './account.component.scss',
  encapsulation: ViewEncapsulation.None,
})
export class AccountComponent {
  store = inject(Store);

  logIn(
    loginForm: Partial<{ username: string | null; password: string | null }>
  ) {
    if (loginForm && loginForm.username && loginForm.password) {
      this.store.dispatch(
        AuthActions.login({
          username: loginForm.username,
          password: loginForm.password,
        })
      );
    }
  }

  createUser() {}
}
