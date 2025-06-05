import { Orders } from '@models/orders.models';
import { IUser, User } from '@models/user.model';
import { createReducer } from '@ngrx/store';

export interface UserState {
  user: IUser;
  // TODO:  make orders type
  orders: Orders[];
}

export const userState: UserState = {
  user: <User>{},
  orders: [],
};

export const userReducer = createReducer(userState);
