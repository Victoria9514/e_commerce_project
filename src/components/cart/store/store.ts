import { IProduct } from '../../../models/product.model';

export interface CartState {
  cart: IProduct[];
}

export const cartState : CartState = {
  cart: [],
};
