import {
  Component,
  ViewEncapsulation,
  booleanAttribute,
  inject,
  input,
  viewChild
} from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import {
  MatListModule,
  MatSelectionList,
  MatSelectionListChange,
} from '@angular/material/list';
import { FilterOptions } from '@models/filter.models';
import { PushPipe } from '@ngrx/component';
import { Store } from '@ngrx/store';
import { selectFilterSelector } from 'src/store/selectors/product.selectors';

@Component({
  selector: 'app-filter-brand-template',
  imports: [MatListModule, MatIconModule, PushPipe],
  template: `
    <mat-selection-list (selectionChange)="selectionChange($event)">
      @for (item of selectFilterSelector$ | ngrxPush; track item.id) {
      <mat-list-option MatListItem [value]="item.id">
        {{ item.prop }}</mat-list-option
      >
      }
    </mat-selection-list>
  `,
  styles: ``,
  encapsulation: ViewEncapsulation.None,
})
export class FilterBrandTemplateComponent {
  private readonly store = inject(Store);
  protected readonly selectFilterSelector$ =
    this.store.select(selectFilterSelector);
  protected readonly FilterOptions = FilterOptions;
  isSelected = input({ transform: booleanAttribute });
  filterOpts = viewChild(MatSelectionList);
  values : string[] = []

  selectionChange(event: MatSelectionListChange) {
    this.values = event.source.selectedOptions?.selected?.map((o) => o.value as string)

    // computed(() =>
    //   this.filterOpts()?.selectedOptions?.selected?.map((o) => o.value as string)
    // );
    console.log(event);
  }
}
