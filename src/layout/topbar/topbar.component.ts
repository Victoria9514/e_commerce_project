import { Component, OnInit, ViewEncapsulation, inject, output, signal } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatBadgeModule } from '@angular/material/badge';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatToolbarModule } from '@angular/material/toolbar';
import { DomSanitizer } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { PushPipe } from '@ngrx/component';
import { Store } from '@ngrx/store';
import { Observable, map, startWith, switchMap } from 'rxjs';
import { ButtonComponent } from '../../common/button/button.component';
import { UploadFileComponent } from '../../common/upload-file/upload-file.component';
import {
  selectAdmin,
  selectCurrentUser
} from '../../components/auth/store/selectors';
import { selectCart } from '../../components/cart/store/selectors';
import { selectAllTitles, selectWishlistItems } from '../../components/product/store/product.selector';
import { updateAvatar } from '../../components/user/store/user.actions';
import { AvatarDirective } from '../../directives/avatar.directive';
import { AuthService } from '../../services/auth.service';
import { NavLinks, NavigationService } from '../../services/navigation.service';
import { ThemeService } from '../../services/theme.service';
import { loadingSpinner } from '../../store/actions';

@Component({
    selector: 'app-topbar',
    imports: [
        MatToolbarModule,
        RouterModule,
        MatIcon,
        PushPipe,
        MatButtonModule,
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
    ],
    encapsulation: ViewEncapsulation.None,
    templateUrl: './topbar.component.html',
    styleUrl: './topbar.component.scss',
})
export class TopbarComponent implements OnInit {
  store = inject(Store);
  authService = inject(AuthService);
  navService = inject(NavigationService);
  user$ = this.store.select(selectCurrentUser);
  isAdmin$ = this.store.select(selectAdmin);
  toggleMenu = output<void>();
  navLinks = signal<NavLinks[]>(this.navService.navLinks);
  options$: Observable<string[]> = this.store.select(selectAllTitles);
  filteredOptions$?: Observable<string[]>;
  searchQuery = new FormControl<string[] | string>([]);
  selectCart$ = this.store.select(selectCart)
  selectWishlistItems$ = this.store.select(selectWishlistItems)
  public sanitizer = inject(DomSanitizer);
  theme = inject(ThemeService);
  isDarkTheme : boolean = this.theme.isDarkMode();

  ngOnInit() {
    this.filteredOptions$ = this.searchQuery.valueChanges.pipe(
      startWith(''),
      switchMap((value) => this._filter(value?.toString() || ''))
    );
  }

  logout() {
    this.authService.logout();
  }

  toggleMode(){
    this.isDarkTheme = !this.isDarkTheme
    this.theme.setDarkMode(this.isDarkTheme)
  }

  private _filter(value: string): Observable<string[]> {
    const filterValue = value.toLowerCase();
    return this.options$.pipe(
      map((value) =>
        value.filter(
          (val) =>
            val?.toLowerCase()?.includes(filterValue) ||
            val?.toLowerCase()?.startsWith(filterValue)
        )
      )
    );
  }
  uploadAvatar(file: FileList, user_id: number) {
    const userData = new FormData();
    userData.append('user_id', JSON.stringify(user_id));
    userData.append('image', file[0]);
    this.store.dispatch(loadingSpinner({ status: true }));
    this.store.dispatch(updateAvatar({ userData }));
  }
}
