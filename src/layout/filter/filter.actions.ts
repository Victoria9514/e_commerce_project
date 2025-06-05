import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
  inject,
  input,
  output,
} from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { FilterBtnActions, FilterTypesComponents } from '@models/filter.models';
import { Store } from '@ngrx/store';
import { ButtonComponent } from 'src/common/button/button.component';
import { FilterActions } from 'src/store/actions/filter.actions';

@Component({
  selector: 'app-filter-actions',
  imports: [ButtonComponent, MatIconModule],
  template: `
    <app-button [label]="label()" (clicked)="actionHandler()"></app-button>
  `,
  styleUrl: './filter.actions.scss',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'filter-actions' },
})
export class FilterActionsComponent extends ButtonComponent {
  private readonly store = inject(Store);
  public selectedHandler = output<boolean>();
  public selected = input();
  public filterClosed = output();
  action = input.required<FilterBtnActions | null>();
  prop = input.required<FilterTypesComponents>();
  values =  input<string[]>();


  clearFilter() {
    this.store.dispatch(FilterActions.clearFilter());
  }

  actionHandler() {
    if (this.action() === FilterBtnActions.DELETE) {
      this.clearFilter();
    }
    if (this.action() === FilterBtnActions.FILTER) {
      FilterActions.selectFilterSelector({
        prop: this.prop(),
        values: []
        // values: this.values(),
      });
    }
  }

  protected close() {
    this.clearFilter();
    this.filterClosed.emit();
  }
}
