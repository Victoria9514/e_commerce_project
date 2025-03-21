import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AppState, SharedState } from '../models/states.models';
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

export const selectSubCategories = createSelector(
  selectSharedState,
  (state: SharedState) => state.categories.map((item) => item.children)
);

export const selectCateregoryChangedOpt = createSelector(
  selectSharedState,
  (state) => state.categoryOptions
);

// export const selectCurrentSubCategory = createSelector(
//   selectCateregoryChangedOpt,
//   selectSubCategories,
//   // (categoryId, children) => children.filter((id) => id?.filter(item => item.categoryId === categoryId))
// );

// export const selectSideBarNavigation = createSelector(
//   selectSharedState,
//   (state) => state?.nodes || []
// );
// export const selectCurrentTypeOfSize = createSelector(
//   selectCateregoryChangedOpt,
//   selectCategories,
//   (currentCategoryId, categories) => categories.filter(item => item.id === c)
//   )
// )

// const sizes  = {
//      0 : {

//     }
// }  as const;
