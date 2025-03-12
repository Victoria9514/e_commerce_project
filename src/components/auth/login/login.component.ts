import { Component, inject, model } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { PushPipe } from '@ngrx/component';
import { Store } from '@ngrx/store';
import { InputFieldComponent } from "../../../common/input-field/input-field.component";
import { SpinnerComponent } from '../../../shared/spinner/spinner.component';
import { loadingSpinner } from '../../../store/actions';
import { selectLoading } from '../../../store/selectors';
import { AuthActions } from '../store/auth.actions';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    FormsModule,
    MatInputModule,
    PushPipe,
    SpinnerComponent,
    InputFieldComponent,
    MatInputModule
],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  router = inject(Store);
  store = inject(Store);
  username = model('');
  password = model('');
  loading$ = this.store.select(selectLoading);

  login() {
    this.store.dispatch(loadingSpinner({ status: true }));
    this.store.dispatch(
      AuthActions.login({
        username: this.username(),
        password: this.password(),
      })
    );
}
}
