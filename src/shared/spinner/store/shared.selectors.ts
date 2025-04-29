import { AppState, ICategory, SharedState } from '@models/states.models';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { initialdFeatureKey } from './shared.reducers';

export const selectAppState =
  createFeatureSelector<AppState>(initialdFeatureKey);

export const selectSharedState = createSelector(
  selectAppState,
  (state: AppState) => state?.sharedState
);

export const selectMessage = createSelector(
  selectSharedState,
  (state: SharedState) => state?.message
);

export const selectLoading = createSelector(
  selectSharedState,
  (state: SharedState) => state?.loading
);

export const selectCategories = createSelector(
  selectSharedState,
  (state: SharedState) => state.categories
);

export const selectCateregoryChangedOpt = createSelector(
  selectSharedState,
  (state) => state.categoryOptions
);
export const selectSubCategories = createSelector(
  selectCategories,
  (categories: ICategory[]) => categories.map((item) => item.children)
);

export const selectSizes = createSelector(
  selectSharedState,
  (state: SharedState) => state.sizes.map((size) => size?.name)
);

export const selectCurrentSubCategory = createSelector(
  selectCateregoryChangedOpt,
  selectSubCategories,
  (categoryId, children) =>
    children.flat().filter((item) => item.categoryId === categoryId)
);
