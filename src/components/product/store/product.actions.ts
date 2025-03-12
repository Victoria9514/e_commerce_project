import { createActionGroup, emptyProps, props } from '@ngrx/store';
import {
  IProduct,
  ProductGender
} from '../../../models/product.model';

export const ProductsActions = createActionGroup({
  source: 'Products Actions',
  events: {
    'Pagination Changed': props<{ page: number; offset: number }>(),
    queryChanged: (query: string) => ({ query }),
    queryChangedSuccess: props<{ products: IProduct[] }>(),
    addProduct: props<{ product: FormData }>(),
    addProductSuccess: emptyProps(),
    loadProducts: emptyProps(),
    loadProductsSuccess: props<{ products: IProduct[] }>(),
    getCurrentProduct: props<{ productId: string }>(),
    getCurrentProductSuccess: props<{ currentProduct: IProduct | undefined }>(),
    navigateToToGender: props<{ gender: ProductGender }>(),
    deleteProduct: props<{ product_id: string }>(),
    deleteProductSuccess: emptyProps(),
    updateProduct: props<{ product: IProduct }>(),
    updateProductSuccess: emptyProps(),
    toggleFavorite : props<{ id : string }>(),
  },
});
