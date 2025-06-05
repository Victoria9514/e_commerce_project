import { FilterOptions } from '@models/filter.models';
import { createActionGroup, props } from '@ngrx/store';

export const NavigationActions = createActionGroup({
  source: 'Navigation Actions',
  events: {
    navigate: props<{
      opt: FilterOptions;
      query: string[] | null;
    }>(),
    navigateSuccess: props<{
      data:{ opt: FilterOptions;
      query: string[] | null};
    }>(),
    // Empty: emptyProps(),
  },
});
