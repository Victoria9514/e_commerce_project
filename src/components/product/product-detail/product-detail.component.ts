import { CurrencyPipe, NgOptimizedImage } from '@angular/common';
import { Component, OnInit, ViewEncapsulation, inject } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { PushPipe } from '@ngrx/component';
import { Store } from '@ngrx/store';
import { ButtonComponent } from '../../../common/button/button.component';
import { CartActions } from '../../../store/actions/cart.actions';
import { ProductsActions } from '../../../store/actions/product.actions';
import { selectCurrentProduct, selectWishlist } from '../../../store/selectors/product.selectors';
import { RatingComponent } from "../rating/rating.component";
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
export class ProductDetailComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private store = inject(Store);
  product$ = this.store.select(selectCurrentProduct);
  wishList$ = this.store.select(selectWishlist);

  ngOnInit(): void {
    const productId = this.route?.snapshot?.paramMap?.get('id');
    console.log(productId)
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
