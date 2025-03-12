import { Component, inject } from '@angular/core';
import { PushPipe } from '@ngrx/component';
import { Store } from '@ngrx/store';
import { CartitemComponent } from './cart-item/cart-item.component';
import { selectCart, selectCartTotal } from './store/selectors';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [PushPipe,CartitemComponent],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss',
})
export class CartComponent {
  store = inject(Store);
  selectCartItems$ = this.store.select(selectCart);
  selectCartTotal$ = this.store.select(selectCartTotal);

  checkout() {

  }
}
