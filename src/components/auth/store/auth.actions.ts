import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { IUser } from '../../../models/user.model';

export const AuthActions = createActionGroup({
  source: 'AUTH Actions',
  events: {
    login: props<{
      username: string;
      password: string;
    }>(),
    loginUserSuccess: props<{
      user: IUser;
    }>(),
    registerUser: props<{
      user: IUser;
    }>(),
    registerUserSuccess: props<{
      user: IUser;
    }>(),
    logOutUser: emptyProps(),
  },
});
