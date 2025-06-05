import { ICategory, ISize } from "@models/product.model";


export const sharedState = {
  loading: true,
  message: '',
  categories: [] as ICategory[],
  categoryOptions: 0,
  categorySizes: [],
  is_dark_mode: false,
  sizes: [] as ISize[],
};
