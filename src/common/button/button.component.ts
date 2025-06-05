import { TitleCasePipe } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
  booleanAttribute,
  input,
  output,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
@Component({
  selector: 'app-button',
  imports: [MatButtonModule, MatIconModule, TitleCasePipe],
  template: `<button
    mat-button
    (click)="clicked.emit()"
    [disabled]="disabled()"
  >
    {{ label() | titlecase }}
    <ng-content select="[icon]"></ng-content>
    <ng-content select="[loading]"></ng-content>
  </button> `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrl: './button.component.scss',
})
export class ButtonComponent {
  disabled = input(false, { transform: booleanAttribute });
  label = input<string>();
  clicked = output();

  protected onClick() {
    this.clicked.emit();
  }
}
