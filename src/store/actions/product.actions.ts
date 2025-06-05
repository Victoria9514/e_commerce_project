import { IProduct } from '@models/product.model';
import { createActionGroup, emptyProps, props } from '@ngrx/store';

export const ProductsActions = createActionGroup({
  source: 'Products Actions',
  events: {
    productSearchTermHandler: props<{ query: string }>(),
    loadProducts: emptyProps(),
    loadProductsSuccess: props<{ products: IProduct[] }>(),
    getCurrentProduct: props<{ productId: string }>(),
    getCurrentProductSuccess: props<{ currentProduct: IProduct }>(),
    toggleFavorite: props<{ id: string; inWishlist: boolean }>(),

    // admin only!!!
    addProduct: props<{ product: FormData }>(),
    addProductSuccess: emptyProps(),
    deleteProduct: props<{ product_id: string }>(),
    deleteProductSuccess: emptyProps(),
    updateProduct: props<{ product: IProduct }>(),
    updateProductSuccess: emptyProps(),
  },
});
