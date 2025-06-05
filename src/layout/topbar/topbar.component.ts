import {
  Component,
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
import { FilterOptions } from '@models/filter.models';
import { NavLinks } from '@models/navigation.models';
import { PushPipe } from '@ngrx/component';
import { Store } from '@ngrx/store';
import { AuthService } from '@services/auth.service';
import { NavigationService } from '@services/navigation.service';
import { ThemeService } from '@services/theme.service';
import { NavigationActions } from 'src/store/actions/navigation.actions';
import { ButtonComponent } from '../../common/button/button.component';
import { UploadFileComponent } from '../../common/upload-file/upload-file.component';
import { SearchComponent } from '../../components/search/search.component';
import { AvatarDirective } from '../../directives/avatar.directive';
import { updateAvatar } from '../../store/actions/user.actions';
import {
  selectAdmin,
  selectCurrentUser,
} from '../../store/selectors/auth.selectors';
import { selectCart } from '../../store/selectors/cart.selectors';
import { selectWishlistItems } from '../../store/selectors/product.selectors';

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
export class TopbarComponent {
  store = inject(Store);
  authService = inject(AuthService);
  user$ = this.store.select(selectCurrentUser);
  isAdmin$ = this.store.select(selectAdmin);
  toggleMenu = output<void>();
  navLinks = signal<NavLinks[]>(inject(NavigationService)?.navLinks);
  selectCart$ = this.store.select(selectCart);
  selectWishlistItems$ = this.store.select(selectWishlistItems);
  sanitizer = inject(DomSanitizer);
  theme = inject(ThemeService);
  matBadge = input<string>('');
  isDarkTheme: boolean = this.theme.isDarkMode();
  FilterOptions = FilterOptions;

  logout() {
    this.authService.logout();
  }

  toggleMode() {
    // TODO PUT THIS IN THE STORE
    this.isDarkTheme = !this.isDarkTheme;
    this.theme.setDarkMode(this.isDarkTheme);
  }
  uploadAvatar(file: FileList, user_id: number) {
    const userData = new FormData();
    userData.append('user_id', JSON.stringify(user_id));
    userData.append('image', file[0]);
    this.store.dispatch(updateAvatar({ userData }));
  }

  navigationChanged(opt: FilterOptions, query: string) {
    console.log(query, opt);
    this.store.dispatch(
      NavigationActions.navigate({ opt, query: [query.toLowerCase()] })
    );
  }
}
