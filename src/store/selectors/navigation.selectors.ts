import { createSelector } from '@ngrx/store';
import { selectAppState } from 'src/store/selectors/shared.selectors';

export const selectNavigationState = createSelector(
  selectAppState,
  (app) => app?.navigationState
);

export const selectNavigationSelector = createSelector(
  selectNavigationState,
  (nav) => nav?.selected
);
