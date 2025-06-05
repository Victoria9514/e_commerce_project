import { FilterOptions, FilterSelector } from '@models/filter.models';
import { createActionGroup, emptyProps, props } from '@ngrx/store';

export const FilterActions = createActionGroup({
  source: 'Filter Actions',
  events: {
    filterBy: props<{
      opt: FilterOptions;
      query: string[] | null;
    }>(),
    //filterByProductKeySuccess: emptyProps(),
    clearFilter: emptyProps(),
    selectFilterSelector: props<FilterSelector>(),
    submitFilterSelector: props<{ submit: boolean }>(),
    submitFilterSelectorSuccess: emptyProps(),
  },
});
