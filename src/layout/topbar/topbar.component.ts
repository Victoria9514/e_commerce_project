import {
  Component,
  OnInit,
  ViewEncapsulation,
  inject,
  input,
  output,
  signal,
} from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatBadgeModule } from '@angular/material/badge';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatToolbarModule } from '@angular/material/toolbar';
import { DomSanitizer } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { IProduct } from '@models/product.model';
import { PushPipe } from '@ngrx/component';
import { Store } from '@ngrx/store';
import { AuthService } from '@services/auth.service';
import { NavLinks, NavigationService } from '@services/navigation.service';
import { ThemeService } from '@services/theme.service';
import { ProductsActions } from 'src/components/product/store/product.actions';
import { ButtonComponent } from '../../common/button/button.component';
import { UploadFileComponent } from '../../common/upload-file/upload-file.component';
import {
  selectAdmin,
  selectCurrentUser,
} from '../../components/auth/store/selectors';
import { selectCart } from '../../components/cart/store/cart.selectors';
import {
  selectWishlistItems
} from '../../components/product/store/product.selector';
import { SearchComponent } from '../../components/search/search.component';
import { updateAvatar } from '../../components/user/store/user.actions';
import { AvatarDirective } from '../../directives/avatar.directive';

@Component({
  selector: 'app-topbar',
  imports: [
    MatToolbarModule,
    RouterModule,
    MatIcon,
    PushPipe,
    MatListModule,
    MatToolbarModule,
    ButtonComponent,
    MatBadgeModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatAutocompleteModule,
    MatInputModule,
    AvatarDirective,
    UploadFileComponent,
    SearchComponent,
  ],
  encapsulation: ViewEncapsulation.None,
  templateUrl: './topbar.component.html',
  styleUrl: './topbar.component.scss',
})
export class TopbarComponent implements OnInit {
  store = inject(Store);
  authService = inject(AuthService);
  user$ = this.store.select(selectCurrentUser);
  isAdmin$ = this.store.select(selectAdmin);
  toggleMenu = output<void>();
  navLinks = signal<NavLinks[]>(inject(NavigationService)?.navLinks);
  selectCart$ = this.store.select(selectCart);
  selectWishlistItems$ = this.store.select(selectWishlistItems);
  public sanitizer = inject(DomSanitizer);
  theme = inject(ThemeService);
  matBadge = input<string>('');
  isDarkTheme: boolean = this.theme.isDarkMode();

  ngOnInit() {}

  logout() {
    this.authService.logout();
  }

  toggleMode() {
    this.isDarkTheme = !this.isDarkTheme;
    this.theme.setDarkMode(this.isDarkTheme);
  }

  uploadAvatar(file: FileList, user_id: number) {
    const userData = new FormData();
    userData.append('user_id', JSON.stringify(user_id));
    userData.append('image', file[0]);
    this.store.dispatch(updateAvatar({ userData }));
  }

  filterProduct(prop: keyof IProduct, value: string) {
    this.store.dispatch(ProductsActions.filterProduct({ prop, value }));
  }
}
