import { ICategory, ISize } from "./product.model";

export interface SharedState {
  loading: boolean;
  message: string;
  categories: Array<ICategory>;
  categoryOptions: number;
  sizes: Array<ISize>;
  is_dark_mode: boolean;
}
