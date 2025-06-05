import { Component, ViewEncapsulation, inject, input, output } from '@angular/core';
import { FilterOptions } from '@models/filter.models';
import { Store } from '@ngrx/store';
import { ButtonComponent } from '../../../common/button/button.component';
import { FilterActions } from '../../../store/actions/filter.actions';

@Component({
  selector: 'app-filter-item',
  imports: [ButtonComponent],
  template: `<app-button
    [label]="sortByBtnLabel()"
    class="filter-item-btn"
    (clicked)="filterByProductProp()"

  ></app-button>`,
  styleUrl: './filter-item.component.scss',
  encapsulation: ViewEncapsulation.None,
  host: { class: 'filter-item' },
})
export class FilterItemComponent {
  store = inject(Store);
  sortByBtnLabel = input<string>();
  value = input.required<FilterOptions | string>();
  toggleFilters = output<void>();

  filterByProductProp() {
    this.toggleFilters.emit()
    this.store.dispatch(
      FilterActions.filterBy({ opt: this.value() as FilterOptions, query: null })
    );
  }
}
