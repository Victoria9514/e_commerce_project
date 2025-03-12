import { createSelector } from '@ngrx/store';
import { AppState } from '../../../models/states.models';
import { IUser, Role } from '../../../models/user.model';
import { selectAppState } from '../../../store/selectors';

const DEFAULT_PROFILE_PIC_URL = './../../../assets/images/blank.png';

export const selectCurrentUser = createSelector(
  selectAppState,
  (state: AppState) => state?.authState?.user
);

export const selectAdmin = createSelector(selectCurrentUser, (state: IUser) => {
  return state?.role === Role.admin;
});

export const selectInitals = createSelector(selectCurrentUser, (state) => {
  console.log(state);
  return (
    `${state?.firstName[0]} ${state?.lastName[0]}` || DEFAULT_PROFILE_PIC_URL
  );
});

export const selectAvatar = createSelector(
  selectCurrentUser,
  (state: IUser) => state?.avatar || ''
);
