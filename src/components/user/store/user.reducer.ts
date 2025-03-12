import { createReducer } from '@ngrx/store';
import { IUser, User } from '../../../models/user.model';

export interface UserState {
  user: IUser;
  // TODO:  make orders type
  orders: any[];
}

export const userState: UserState = {
  user: <User>{},
  orders: [],
};

export const userReducer = createReducer(userState);
