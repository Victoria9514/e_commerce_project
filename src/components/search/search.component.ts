import {
  ChangeDetectionStrategy,
  Component,
  HostListener,
  ViewEncapsulation,
  inject,
  signal,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { PushPipe } from '@ngrx/component';
import { Store } from '@ngrx/store';

import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { FilterProductPipe } from 'src/pipes/filter.product.pipe';
import { ProductsActions } from '../../store/actions/product.actions';
import { selectProducts } from '../../store/selectors/product.selectors';

@Component({
  selector: 'app-search',
  imports: [
    MatSelectModule,
    FormsModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatAutocompleteModule,
    MatIconModule,
    PushPipe,
    FilterProductPipe,
  ],
  templateUrl: './search.component.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrl: './search.component.scss',
})
export class SearchComponent {
  store = inject(Store);
  productOptions$ = this.store.select(selectProducts);
  searchTerm = signal('');

  @HostListener('document:keydown.enter')
  selected(query: string) {
    this.store.dispatch(ProductsActions.productSearchTermHandler({ query }));
  }
}

// searchResults = this.httpResource({
//   url: () => `${this.url()}?${this.query()}`,
// });
// query = input<string>('');
// url = input<string>('');
// // searchQuery = new FormControl<string[] | string>([]);

// httpResource(params: {
//   url: () => string;
//   request?: () => string;
// }): Resource<Array<unknown> | undefined> {
//   return resource({
//     request: params.request || (() => ''),
//     loader: () =>
//       fetch(params.url()).then((res) => res.json()) as Promise<unknown[]>,
//   });
// }
