import { createReducer, on } from '@ngrx/store';
import { NavigationActions } from '../actions/navigation.actions';
import { navigationState } from '../navigation.store';

export const navigationReducer = createReducer(
  navigationState,
  on(NavigationActions.navigate, (state, action) => {
    console.log(state);
    return {
      ...state,
      selected: [
        { navLink: action.opt, value: action.query },
      ],
    };
  })
);
