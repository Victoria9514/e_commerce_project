import { CurrencyPipe } from '@angular/common';
import { Component, ViewEncapsulation, inject } from '@angular/core';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { RouterModule } from '@angular/router';
import { PushPipe } from '@ngrx/component';
import { Store } from '@ngrx/store';
import { ButtonComponent } from "../../common/button/button.component";
import { CartitemComponent } from './cart-item/cart-item.component';
import { selectCartItems, selectCartTotal } from './store/cart.selectors';

@Component({
    selector: 'app-cart-list',
    imports: [PushPipe, MatDividerModule, RouterModule, CartitemComponent, MatInputModule, CurrencyPipe, MatIconModule, ButtonComponent],
    templateUrl: './cart-list.component.html',
    encapsulation: ViewEncapsulation.None,
    styleUrl: './cart-list.component.scss'
})
export class CartListComponent {
  store = inject(Store);
  selectCartItems$ = this.store.select(selectCartItems);
  selectCartTotal$ = this.store.select(selectCartTotal);

  checkout() {

  }
}
