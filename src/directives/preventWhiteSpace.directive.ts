import { Directive, HostListener, inject } from '@angular/core';
import {
  AbstractControl,
  ControlValueAccessor,
  NgControl,
} from '@angular/forms';

@Directive({
  selector: 'input[removeWhitespaces], textarea[removeWhitespaces]',
})
export class RemoveWhiteSpaceDirective {
  private _control = inject(NgControl);
  private _formControl!: AbstractControl<any, any>;
  private originalRegisterOnChange: ((fn: any) => void) | undefined;

  constructor() {
    if (this._control.valueAccessor) {
      this.trimValueAccessor(this._control.valueAccessor);
    }
  }

  public ngOnInit(): void {
    if (this._control.control) {
      this._formControl = this._control.control;
    }
  }

  @HostListener('blur')
  public onBlur() {
    if (this._formControl) {
      const orig = this._formControl.updateValueAndValidity;
      this._formControl.updateValueAndValidity = () => {};

      const value = this._formControl.value;
      this._formControl.setValue(
        typeof value === 'string' ? value.trim() : value,
        { emitValue: false, onlySelf: true }
      );

      this._formControl.updateValueAndValidity = orig;
    }
  }

  private trimValueAccessor(valueAccessor: ControlValueAccessor) {
    this.originalRegisterOnChange = valueAccessor.registerOnChange;

    valueAccessor.registerOnChange = (fn) => {
      return this.originalRegisterOnChange?.call(
        valueAccessor,
        (value: string) => {
          return fn(typeof value === 'string' ? value.trim() : value);
        }
      );
    };
  }
}
