import { KeyValuePipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, ViewEncapsulation, output } from '@angular/core';
import { filterLabels } from '@models/filter.models';
import { FilterItemComponent } from '../filter-item/filter-item.component';

@Component({
  selector: 'app-filter-list',
  imports: [FilterItemComponent, KeyValuePipe],
  template: `
    @for(item of filterLabels | keyvalue; track item) {
    <app-filter-item [sortByBtnLabel]="item.value" [value]="item.key" (toggleFilters)="toggleFilters.emit()"></app-filter-item>
    }
  `,
  styleUrl: './filter-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class FilterListComponent {
  protected filterLabels = filterLabels;
  protected toggleFilters = output<void>();
}
