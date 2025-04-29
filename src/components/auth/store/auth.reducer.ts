import { IUser, User } from '@models/user.model';
import { createReducer, on } from '@ngrx/store';
import {
  updateAvatar,
  updateAvatarSuccess,
} from '../../user/store/user.actions';
import { AuthActions } from './auth.actions';

export interface AuthState {
  user: IUser;
}

export const authState: AuthState = {
  user: {} as IUser,
};

export const authReducer = createReducer(
  authState,
  on(AuthActions.loginUserSuccess, (state, payload) => {
    return {
      ...state,
      user: payload.user,
    };
  }),
  on(AuthActions.logOutUser, (state) => {
    return {
      ...state,
      user: {} as User,
    };
  }),
  on(updateAvatar, (state, payload) => {
    console.log(state, payload.userData, 'REDUCER');
    // for(const value of payload.userData?.values()) {
    //   console.log(value);
    // }
    return {
      ...state,
      user: {
        ...state.user,
        avatar: state.user?.avatar,
      },
    };
  }),
  on(updateAvatarSuccess, (state, payload) => {
    return {
      ...state,
      // message: payload.message,
      user: {
        ...state.user,
        avatar: payload.user?.avatar,
      },
    };
  })
);
