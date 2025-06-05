import { Component, ViewEncapsulation, inject, output } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatDivider } from '@angular/material/divider';
import { MatInputModule } from '@angular/material/input';
import { RouterModule } from '@angular/router';
import { PushPipe } from '@ngrx/component';
import { Store } from '@ngrx/store';
import { SpinnerComponent } from '@shared/spinner/spinner.component';
import { ButtonComponent } from 'src/common/button/button.component';
import { selectLoading } from 'src/store/selectors/shared.selectors';

@Component({
  selector: 'app-login',
  imports: [
    FormsModule,
    RouterModule,
    MatDivider,
    MatInputModule,
    PushPipe,
    SpinnerComponent,
    ButtonComponent,
    MatInputModule,
    ReactiveFormsModule,
  ],
  templateUrl: './login.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  router = inject(Store);
  store = inject(Store);
  // username = input<string>('');
  // password = input<string>('');
  // Make login interface
  tryToLogin = output<Partial<{ username: string | null; password: string | null; }>>();
  loading$ = this.store.select(selectLoading);

  public loginForm = new FormGroup({
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
  });
}
