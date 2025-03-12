import { createReducer, on } from '@ngrx/store';
import { UserTableModel } from '../../../models/user.model';
import { AdminActions } from './admin.actions';

export interface AdminState {
  isAdmin: boolean;
  users: UserTableModel[];
  orders: [];
}

export const adminState: AdminState = {
  isAdmin: false,
  users: [],
  orders: [],
};

export const adminReducer = createReducer(
  adminState,

  on(AdminActions.loadUsersSuccess, (state, payload) => {
    return {
      ...state,
      users: payload?.users,
    };
  }),
  on(AdminActions.deleteUser, (state, payload) => {
    return {
      ...state,
      users: state.users?.filter((user) => user.user_id !== +payload?.user_id),
    };
  }),
  on(AdminActions.updateUser, (state, payload) => {
    return {
      ...state,
      users: [
        ...state.users.map((u) =>
          u.user_id === payload.user.user_id ? { ...payload.user } : u
        ),
      ],
    };
  })
);
