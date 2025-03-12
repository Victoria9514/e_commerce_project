import { createSelector } from '@ngrx/store';
import { AppState } from '../../../models/states.models';
import { User, UserTableModel } from '../../../models/user.model';
import { selectAppState } from '../../../store/selectors';

export const selectAllUsers = createSelector(
  selectAppState,
  (state: AppState) => state.adminState?.users || []
);

export const selectTableUsersProps = createSelector(
  selectAllUsers,

  (state: UserTableModel[]) =>
    state.length > 0
      ? state?.map((user) => {
          return new User(user) || {};
        })
      : []
);

export const selectUserPropsForColumnTable = createSelector(
  selectAllUsers,
  (columns) => {
    return columns[0] ? Object?.keys(columns[0]) : [];
  }
);
