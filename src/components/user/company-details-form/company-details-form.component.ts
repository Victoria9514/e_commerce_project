import { Component, ViewEncapsulation } from '@angular/core';
import {
  FormControl,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { EIKValidator } from 'src/validators';

@Component({
  selector: 'app-company-details-form',
  imports: [
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  template: ` <mat-form-field>
      <mat-label>EIK</mat-label>
      <input
        removeWhitespaces
        matInput
        placeholder="EIK"
        [formControl]="eik"
        maxlength="12"
      />
      @if(eik.errors?.['isValidEIKNumber']){
        <mat-error>please, your code must star with 'BG' and your length must be between 11 and 12 symbols</mat-error>
      }
    </mat-form-field>
    <mat-form-field>
      <mat-label>Company name</mat-label>
      <input removeWhitespaces matInput [formControl]="companyName" />
    </mat-form-field>`,
  encapsulation: ViewEncapsulation.None,
  styleUrl: './company-details-form.component.scss',
})
export class CompanyDetailsFormComponent {
  eik = new FormControl<string|null>(null,[Validators.required, EIKValidator(), Validators.minLength(11), Validators.maxLength(12), ]);
  companyName = new FormControl('', [Validators.required]);

}
