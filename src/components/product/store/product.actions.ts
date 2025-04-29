import {
  IProduct
} from '@models/product.model';
import { createActionGroup, emptyProps, props } from '@ngrx/store';

export const ProductsActions = createActionGroup({
  source: 'Products Actions',
  events: {
    'Pagination Changed': props<{ page: number; offset: number }>(),
    handleProductQueryChange: props<{query: string}>(),
    handleProductQueryChangeSuccess:  emptyProps(),
    // queryChangedSuccess: props<{ products: IProduct[] }>(),
    addProduct: props<{ product: FormData }>(),
    addProductSuccess: emptyProps(),
    loadProducts: emptyProps(),
    loadProductsSuccess: props<{ products: IProduct[] }>(),
    getCurrentProduct: props<{ productId: string }>(),
    getCurrentProductSuccess: props<{ currentProduct: IProduct  }>(),
    // navigateToToGender: props<{ gender: ProductGender }>(),
    filterProduct :  props<{ prop: keyof IProduct, value: string }>(),
    filterProductSuccess :  emptyProps(),
    toggleFavorite : props<{ id : string, inWishlist: boolean }>(),
    deleteProductItemFromWishlist: props<{ id : string }>(),
    // admin only!!!
    deleteProduct: props<{ product_id: string }>(),
    deleteProductSuccess: emptyProps(),
    updateProduct: props<{ product: IProduct }>(),
    updateProductSuccess: emptyProps(),
  },
});
