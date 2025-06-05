import { createSelector } from '@ngrx/store';
import { selectAppState } from 'src/store/selectors/shared.selectors';

export const selectFilterState = createSelector(
  selectAppState,
  (appState) => appState?.filterState
);

export const selectSortBy = createSelector(
  selectFilterState,
  (state) => state?.sortBy
);

export const selectFilterBy = createSelector(selectFilterState, (state) => {
  return { type: state?.filterBy[state.filterBy.length - 1]?.opt };
});

export const selectFilterSelectors = createSelector(
  selectFilterState,
  (state) => state?.filterBySelector || null
);

export const selectPriceRangeFilter = createSelector(
  selectFilterState,
  (state) => state?.priceRange
);

export const selectIsValueSelected = createSelector(
  selectFilterSelectors,
  (state) => state?.map(filterSelector => filterSelector.values?.length > 0 )
);

