import { createAction, props } from '@ngrx/store';
import { IUser } from '../../../models/user.model';

export const updateAvatar = createAction(
  '[UPDATE AVATAR] UPDATE',
  props<{ userData: FormData }>()
);

export const updateAvatarSuccess = createAction(
  '[UPDATE AVATAR] UPDATE',
  props<{ user: IUser; message: string }>()
);
