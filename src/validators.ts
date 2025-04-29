import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function phoneNumberValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const patternt = /^(\s+|\s|8[- ]?[789]([- ]?\d){7})$/gm;
    const isValid = patternt.test(control.value);
    if (!isValid) return { notValidNumber: true };
    return null;
  };
}

export function postalCodeValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    return control?.value?.length < 4 ? { isValidLength: true } : null;
  };
}

export function EIKValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    return !control?.value?.startsWith('BG') || control?.value?.length < 11
      ? { isValidEIKNumber: true }
      : null;
  };
}
