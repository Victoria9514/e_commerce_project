import { IProduct } from "./product.model";
import { UserTableModel } from "./user.model";

export enum DataSourceOption {
  USERS = 'USERS',
  PRODUCTS = 'PRODUCTS',
}

export enum TableDataActions {
  DELETE = 'delete',
  EDIT = 'edit',
}

export type DataTableTypes = IProduct | UserTableModel;
