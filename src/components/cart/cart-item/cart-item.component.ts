import { NgOptimizedImage } from '@angular/common';
import { Component, inject, input } from '@angular/core';
import { toObservable } from '@angular/core/rxjs-interop';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { IProduct } from '@models/product.model';
import { PushPipe } from '@ngrx/component';
import { Store } from '@ngrx/store';
import { loadingSpinner } from '@shared/spinner/store/shared.actions';
import { ButtonComponent } from 'src/common/button/button.component';
import { ProductsActions } from 'src/components/product/store/product.actions';
import { selectCurrentProduct } from 'src/components/product/store/product.selector';
import { CartActions } from '../store/cart.actions';
@Component({
  selector: 'app-cart-item',
  imports: [
    ButtonComponent,
    MatIconModule,
    MatDividerModule,
    NgOptimizedImage,
    PushPipe,
  ],
  templateUrl: './cart-item.component.html',
  styleUrl: './cart-item.component.scss',
})
export class CartitemComponent {
  item = input.required<IProduct>();
  item$ = toObservable(this.item);
  store = inject(Store);
  currentProduct$ = this.store.select(selectCurrentProduct);
  loading$ = this.store.select(loadingSpinner);

  toggleFavorite(id: string, inWishlist: boolean) {
    this.store.dispatch(ProductsActions.toggleFavorite({ id, inWishlist }));
  }

  deleteProductFromCart(id: string) {
    this.store.dispatch(CartActions.deleteCartItem({ id }));
  }
}
