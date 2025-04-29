import { CurrencyPipe, NgOptimizedImage } from '@angular/common';
import { Component, OnInit, ViewEncapsulation, inject } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { PushPipe } from '@ngrx/component';
import { Store } from '@ngrx/store';
import { ButtonComponent } from '../../../common/button/button.component';
import { CartActions } from '../../cart/store/cart.actions';
import { RatingComponent } from "../rating/rating.component";
import { ProductsActions } from '../store/product.actions';
import { selectCurrentProduct, selectWishlist } from '../store/product.selector';
@Component({
    selector: 'app-product-detail',
    imports: [
    RouterModule,
    PushPipe,
    NgOptimizedImage,
    ButtonComponent,
    MatIconModule,
    CurrencyPipe,
    RatingComponent
],
    templateUrl: './product-detail.component.html',
    styleUrl: './product-detail.component.scss',
    encapsulation: ViewEncapsulation.None
})
export class ProductdetailComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private store = inject(Store);
  product$ = this.store.select(selectCurrentProduct);
  wishList$ = this.store.select(selectWishlist);

  ngOnInit(): void {
    const productId = this.route?.snapshot?.paramMap?.get('id');
    if (productId)
      this.store.dispatch(ProductsActions.getCurrentProduct({ productId }));
  }

  add(id: string) {
    this.store.dispatch(CartActions.addCartItem({ id }));
  }

  toggleFavorite(id: string, inWishlist: boolean) {
    this.store.dispatch(ProductsActions.toggleFavorite({ id , inWishlist}));
  }
}
