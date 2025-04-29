import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  HostListener,
  OnInit,
  ViewEncapsulation,
  inject,
} from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { PushPipe } from '@ngrx/component';
import { Store } from '@ngrx/store';
import { SpinnerComponent } from '@shared/spinner/spinner.component';
import {
  Observable,
  debounceTime,
  distinctUntilChanged,
  map,
  of,
  startWith,
  switchMap,
  tap
} from 'rxjs';

import { MatOptionSelectionChange } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { ButtonComponent } from 'src/common/button/button.component';
import { ProductsActions } from '../product/store/product.actions';
import { selectSearchQueryOptions } from '../product/store/product.selector';

@Component({
  selector: 'app-search',
  imports: [
    MatSelectModule,
    FormsModule,
    ReactiveFormsModule,
    ButtonComponent,
    MatInputModule,
    SpinnerComponent,
    MatFormFieldModule,
    MatAutocompleteModule,
    MatIconModule,
    PushPipe,
  ],
  templateUrl: './search.component.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrl: './search.component.scss',
})
export class SearchComponent implements OnInit {
  store = inject(Store);
  options$ = this.store.select(selectSearchQueryOptions);
  filteredOptions$?: Observable<Set<string>>;
  searchQuery = new FormControl<string>('');
  changeDetection?: ChangeDetectorRef;

  ngOnInit() {
    this.filteredOptions$ = this.searchQuery.valueChanges.pipe(
      startWith(''),
      debounceTime(300),
      distinctUntilChanged(),
      switchMap((value) => this._filter(value?.toString() || ''))
    );

    this.searchQuery.updateValueAndValidity()
    console.log('destroyde');
    this.changeDetection?.markForCheck();
  }

  private _filter(value: string) {
    const filterValue = value.toLowerCase();
    const prev = value;
    if (value !== '') {
      return this.options$.pipe(
        map(
          (value) =>
            new Set([
              ...value.filter(
                (query) =>
                  query.toLowerCase().startsWith(filterValue) ||
                  query.toLowerCase().includes(filterValue)
              ),
            ])
        )
      );
    }
    return of(new Set(''));
  }

  @HostListener('document:keydown.enter')
  selectedEnterPressed() {
    this.searchQuery.valueChanges.pipe(
      tap((data) => this.selected(data as string))
    );
  }

  selected(query: MatOptionSelectionChange | string) {
    console.log('clicked');
    console.log(query);
    if (query instanceof MatOptionSelectionChange) query = query.source.value;
    this.store.dispatch(
      ProductsActions.handleProductQueryChange({
        query: query.toString(),
      })
    );
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
}
