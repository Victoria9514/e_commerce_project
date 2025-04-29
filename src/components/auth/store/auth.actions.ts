import { IUser } from '@models/user.model';
import { createActionGroup, emptyProps, props } from '@ngrx/store';

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
