import { Component, inject } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { PushPipe } from '@ngrx/component';
import { Store } from '@ngrx/store';
import { ButtonComponent } from 'src/common/button/button.component';
import { ProductsActions } from '../../store/actions/product.actions';
import { selectWishlistItems } from '../../store/selectors/product.selectors';

@Component({
    selector: 'app-favorites',
    imports: [PushPipe,MatIconModule,ButtonComponent],
    templateUrl: './favorites.component.html',
    styleUrl: './favorites.component.scss'
})
export class FavoritesComponent {
  store = inject(Store);
  selectWishlistItems$ = this.store.select(selectWishlistItems);

  deleteItem(id: string) {
    this.store.dispatch(ProductsActions.toggleFavorite({id, inWishlist: true}))
  }
}
