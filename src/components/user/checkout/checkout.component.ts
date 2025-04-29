import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  model,
} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import {
  MatCheckboxChange,
  MatCheckboxModule,
} from '@angular/material/checkbox';
import { MatDivider } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatStepperModule } from '@angular/material/stepper';
import { PushPipe } from '@ngrx/component';
import { Store } from '@ngrx/store';
import { selectLoading } from '@shared/spinner/store/shared.selectors';
import { NumbersOnlyDirective } from 'src/directives/numbersOnly.directive';
import { RemoveWhiteSpaceDirective } from 'src/directives/preventWhiteSpace.directive';
import { phoneNumberValidator, postalCodeValidator } from 'src/validators';
import { SpinnerComponent } from '../../../shared/spinner/spinner.component';
import { CompanyDetailsFormComponent } from '../company-details-form/company-details-form.component';

export enum DeliveryPaymentType {
  PAYMENTVIAPOST = 'PAYMENT VIA POST',
  PAYMENTONDELIVERY = 'PAYMENT ON DELIVERY',
}

export enum DeliveryPaymentMethod {
  PAYMENTBYCARD = 'PAYMENT BY CARD',
  PAYMENTONDELIVERY = 'PAYMENT ON DELIVERY',
}

export enum DeliveryMethod {
  BYCOURIER = 'by courier',
  TOOFFICE = 'to office',
}


export enum CashOnDelivery {
  HOMEDELIVERY = 'HOME DELIVERY',
  OFFICEDELIVERY = 'OFFICE DELIVERY',
}

// payment by cash
export const PaymentByCash = {
  0: `${DeliveryPaymentType.PAYMENTONDELIVERY} ${DeliveryMethod.TOOFFICE}`,
  1: `${DeliveryPaymentType.PAYMENTONDELIVERY} BY ${DeliveryMethod.BYCOURIER}`,
} as const;

@Component({
  selector: 'app-checkout',
  imports: [
    MatStepperModule,
    MatIconModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    FormsModule,
    MatCheckboxModule,
    MatRadioModule,
    SpinnerComponent,
    PushPipe,
    RemoveWhiteSpaceDirective,
    NumbersOnlyDirective,
    MatCheckboxModule,
    CompanyDetailsFormComponent,
    CommonModule,
    MatDivider,
  ],
  templateUrl: './checkout.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrl: './checkout.component.scss',
})
export class CheckoutComponent {
  store = inject(Store);
  loading$ = this.store.select(selectLoading);
  addressForm!: FormGroup;
  isChecked = model<boolean>(false);
  DeliveryPaymentType = DeliveryPaymentType;
  DeliveryPaymentMethod = DeliveryPaymentMethod;
  readonly deliveryOptions = model<
    | null
    | DeliveryPaymentType.PAYMENTONDELIVERY
    | DeliveryPaymentType.PAYMENTVIAPOST
  >();
  DeliveryMethod = DeliveryMethod;
  constructor() {
    this.createAddrressForm();
  }

  PaymentByCash = PaymentByCash;
  get address(): any {
    return this.addressForm.get('address');
  }

  updatedValue(value: MatCheckboxChange) {
    this.isChecked.set(value.checked);
  }

  createAddrressForm() {
    this.addressForm = inject(FormBuilder).group({
      email: ['', [Validators.required, Validators.email]],
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      phoneNumber: [
        null,
        {
          validators: [
            Validators.required,
            phoneNumberValidator(),
            Validators.maxLength(9),
            Validators.minLength(9),
          ],
        },
      ],
      address: inject(FormBuilder).group({
        street: [null, [Validators.required]],
        city: ['', [Validators.required]],
        apartment: ['', [Validators.required]],
        postalCode: [
          null,
          [
            Validators.required,
            postalCodeValidator(),
            Validators.minLength(4),
            Validators.maxLength(4),
          ],
        ],
      }),
    });
  }

  onAddressFormSubmitted() {
    console.log(this.addressForm.value);
  }
}
