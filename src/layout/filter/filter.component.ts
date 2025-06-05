import { NgComponentOutlet, TitleCasePipe } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  Type,
  ViewContainerRef,
  ViewEncapsulation,
  inject,
  output,
} from '@angular/core';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import {
  FilterBtnActions,
  FilterOptions,
  FilterTypesComponents,
  IFilterTypes,
} from '@models/filter.models';
import { PushPipe } from '@ngrx/component';
import { Store } from '@ngrx/store';
import { map } from 'rxjs';
import { selectFilterBy } from 'src/store/selectors/filter.selectors';
import { FilterActionsComponent } from './filter.actions';
import { FilterBrandTemplateComponent } from './filter.brand.template';
import { FilterColorTemplateComponent } from './filter.color.template';
import { FilterPriceTemplateComponent } from './filter.price.template';
import { FilterSizeTemplateComponent } from './filter.size.template';

@Component({
  selector: 'app-filter',
  imports: [
    PushPipe,
    NgComponentOutlet,
    FilterActionsComponent,
    MatIconModule,
    MatDividerModule,
    TitleCasePipe,
  ],
  templateUrl: './filter.component.html',
  styleUrl: './filter.component.scss',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'filter' },
})
export class FilterComponent {
  FilterOptions = FilterOptions;
  FilterBtnActions = FilterBtnActions;
  private readonly store = inject(Store);
  protected selectFilterBy$ = this.store.select(selectFilterBy);
  public filterClosed = output();
  protected isFilterSelected = { isSelected: false };
  currentSelectedComponentType!: FilterTypesComponents;
  vcr = inject(ViewContainerRef);
  // values  = this.vcr

  protected selectCurrentComponent$ = this.store
    .select(selectFilterBy)
    .pipe(map((value) => [this._filterTypesAdapter(value)]));

  private _filterTypesAdapter(filter: IFilterTypes): {
    component: Type<FilterTypesComponents> | null;
  } {
    this.currentSelectedComponentType = filter.type;
    if (filter.type === FilterOptions.COLOR) {
      this.vcr.createComponent(FilterColorTemplateComponent);
      return {
        component: FilterColorTemplateComponent,
      };
    }
    if (filter.type === FilterOptions.PRICE) {
      this.vcr.createComponent(FilterPriceTemplateComponent);
      console.log(this.vcr);

      return {
        component: FilterPriceTemplateComponent,
      };
    }
    if (filter.type === FilterOptions.BRAND) {
      this.vcr.createComponent(FilterBrandTemplateComponent);
      console.log(this.vcr);
      FilterBrandTemplateComponent;
      return {
        component: FilterBrandTemplateComponent,
      };
    }
    if (filter.type === FilterOptions.SIZE) {
      return {
        component: FilterSizeTemplateComponent,
      };
    }
    return { component: null };
  }
}
