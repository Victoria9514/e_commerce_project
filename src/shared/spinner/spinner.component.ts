import { Component, ViewEncapsulation, input } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
@Component({
  selector: 'app-spinner',
  imports: [MatProgressSpinnerModule],
  templateUrl: './spinner.component.html',
  styleUrl: './spinner.component.scss',
  encapsulation: ViewEncapsulation.None,
  host: {
    class: 'app-spinner'
  }
})
export class SpinnerComponent {
  diameter = input.required();
  strokeWidth = input.required();
}
