import { ChangeDetectionStrategy, Component, ViewEncapsulation, inject, model } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSliderModule } from '@angular/material/slider';
// import { selectMaxMinProductPrice } from '@components/filter/store/filter.selectors';
import { Store } from '@ngrx/store';
@Component({
  selector: 'app-filter-price-template',
  imports: [
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatCheckboxModule,
    MatSliderModule,
  ],
  template: ` <section>
      <mat-form-field>
        <mat-label>Min value</mat-label>
        <input matInput type="number" [(ngModel)]="slider.min" />
      </mat-form-field>
      <mat-form-field>
        <mat-label>Max value</mat-label>
        <input matInput type="number" [(ngModel)]="slider.max" />
      </mat-form-field>
    </section>
    <div>
      <label>Value</label>
      <label>{{ slider.value }}</label>
    </div>
    <mat-slider
      [disabled]="disabled"
      >
      <input matSliderThumb [(ngModel)]="value" #slider />
      <!-- [max]="(values | ngrxPush)?.max"
      [min]="(values | ngrxPush)?.min" -->
    </mat-slider>

    {{ value() }}`,
  styles: ``,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FilterPriceTemplateComponent {
  protected store = inject(Store);
  value = model();
  disabled = false;
  // values = this.store?.select(selectMaxMinProductPrice);
}
