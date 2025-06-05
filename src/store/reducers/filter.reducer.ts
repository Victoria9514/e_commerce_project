import { createReducer, on } from '@ngrx/store';
import { FilterActions } from '../actions/filter.actions';
import { filterState } from '../filter.store';

export const filterReducer = createReducer(
  filterState,

  // FILTER BY, SORT BY

  on(FilterActions.filterBy, (state, action) => {
    console.log(state);
    return {
      ...state,
      filterBy: [
        ...state.filterBy,
        { opt: action?.opt, values: action?.query },
      ],
    };
  }),
  on(FilterActions.clearFilter, (state) => {
    return {
      ...state,
      filterBy: [],
    };
  }),
  on(FilterActions.selectFilterSelector, (state, action) => {
    return {
      ...state,
      filterBySelector: [
        ...state.filterBySelector,
        { prop: action.prop, values: action.values },
      ],
    };
  }),
  on(FilterActions.submitFilterSelector, (state, action) => {
    return {
      ...state,
      submit: action.submit,
    };
  }),
  on(FilterActions.submitFilterSelectorSuccess, (state) => {
    return {
      ...state,
      submit: false,
    };
  })
);
