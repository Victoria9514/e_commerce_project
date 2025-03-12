import { Component, inject } from '@angular/core';
import { PushPipe } from '@ngrx/component';
import { Store } from '@ngrx/store';
import { selectCurrentUser } from '../../auth/store/selectors';
import { CartComponent } from "../../cart/cart.component";
import { FavoritesComponent } from "../../favorites/favorites.component";

@Component({
    selector: 'app-profile',
    imports: [PushPipe, CartComponent, FavoritesComponent],
    templateUrl: './profile.component.html',
    styleUrl: './profile.component.scss'
})
export class ProfileComponent {
  store = inject(Store);
  user$ = this.store.select(selectCurrentUser);
}
