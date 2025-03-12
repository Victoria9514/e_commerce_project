import { Component, input, output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
@Component({
    selector: 'app-button',
    imports: [MatButtonModule, MatIconModule],
    templateUrl: './button.component.html',
    styleUrl: './button.component.scss'
})
export class ButtonComponent {
  public isDisabled = input<boolean>();

  label = input<string>('');
  icon = input<string>('');
  clicked = output();

  onClick() {
    this.clicked.emit();
  }
}
