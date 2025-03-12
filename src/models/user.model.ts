export interface IUser {
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  password?: string;
  user_id: number;
  role: Role;
  status: Status;
  token?: string;
  theme?: Theme;
  cart?: string[];
  favorites?: string[];
  avatar: string;
  address: Address;
}

export class User implements IUser {
  username!: string;
  firstName!: string;
  lastName!: string;
  email!: string;
  password?: string;
  user_id!: number;
  token?: string | undefined;
  theme?: Theme | undefined;
  cart?: string[] | undefined;
  favorites?: string[] | undefined;
  role!: Role;
  status!: Status;
  avatar!: string;
  address!: Address;

  constructor(user?: Partial<IUser>) {
    Object.assign(this, user);
  }
}

interface Address {
  address_line1: string;
  address_line2: string;
  country: string;
  city: string;
  postal_code: string;
  phone_number: string;
  user_id: number;
}

export enum Status {
  active = 'ACTIVE',
  disabled = 'DISABLED',
  deleted = 'DELETED',
}
export enum Role {
  user = 'USER',
  admin = 'ADMIN',
}

enum Theme {
  light = 'LIGHT',
  dark = 'DARK',
}

export type UserTableModel = {
  email: string;
  firstName: string;
  lastName: string;
  role: Role;
  user_id: number;
  username: string;
};
