import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { RegisterForm } from '@models/register_form.model';
import { User } from '@models/user.model';
import { PushPipe } from '@ngrx/component';
import { Store } from '@ngrx/store';
import { AuthService } from '@services/auth.service';
import { SpinnerComponent } from '@shared/spinner/spinner.component';
import { ButtonComponent } from 'src/common/button/button.component';
import { selectLoading } from '../../../../shared/spinner/store/shared.selectors';
import { AuthActions } from '../../store/auth.actions';

@Component({
  selector: 'app-register',
  imports: [
    MatFormFieldModule,
    ReactiveFormsModule,
    MatInputModule,
    ReactiveFormsModule,
    PushPipe,
    SpinnerComponent,
    ButtonComponent,
    MatIconModule,
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent {
  store = inject(Store);
  authService = inject(AuthService);
  registerForm!: FormGroup<RegisterForm>;
  loading$ = this.store.select(selectLoading);

  constructor(private fb: FormBuilder) {
    this.registerForm = this.fb.nonNullable.group<RegisterForm>({
      username: new FormControl('', [Validators.required]),
      firstName: new FormControl('', [Validators.required]),
      lastName: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required]),
    });
  }

  onSubmit() {
    const user = new User(this.registerForm.value);
    this.store.dispatch(AuthActions.registerUser({ user }));
  }
}
