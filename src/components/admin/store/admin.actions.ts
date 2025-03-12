import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { IUser, UserTableModel } from '../../../models/user.model';

export const AdminActions = createActionGroup({
  source: 'ADMIN Actions',
  events: {
    loadUsers: emptyProps(),
    loadUsersSuccess: props<{ users: UserTableModel[] }>(),
    deleteUser: props<{ user_id: number }>(),
    deleteUsersSuccess: emptyProps(),
    updateUser: props<{ user: IUser }>(),
    updateUsersSuccess: emptyProps(),
  },
});
