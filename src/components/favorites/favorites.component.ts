import { Component, inject } from '@angular/core';
import { PushPipe } from '@ngrx/component';
import { Store } from '@ngrx/store';
import { selectWishlistItems } from '../product/store/product.selector';

@Component({
    selector: 'app-favorites',
    imports: [PushPipe],
    templateUrl: './favorites.component.html',
    styleUrl: './favorites.component.scss'
})
export class FavoritesComponent {
  store = inject(Store);
  selectWishlistItems$ = this.store.select(selectWishlistItems);
}
