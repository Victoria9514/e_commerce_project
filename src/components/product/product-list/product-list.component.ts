import {
  CdkVirtualScrollViewport,
  ScrollingModule,
} from '@angular/cdk/scrolling';
import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  ViewEncapsulation,
  inject,
  viewChild,
} from '@angular/core';
import { MatGridListModule } from '@angular/material/grid-list';
import { ActivatedRoute } from '@angular/router';
import { PushPipe } from '@ngrx/component';
import { Store } from '@ngrx/store';
import { SpinnerComponent } from '@shared/spinner/spinner.component';
import { loadingSpinner } from 'src/store/actions/shared.actions';
import { ProductsActions } from '../../../store/actions/product.actions';
import { selectFilterProducts } from '../../../store/selectors/product.selectors';
import { ProductItemComponent } from '../product-item/product-item.component';
@Component({
  selector: 'app-product-list',
  imports: [
    PushPipe,
    ProductItemComponent,
    MatGridListModule,
    SpinnerComponent,
    ScrollingModule,
  ],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.scss',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'product-list' },
})
export class ProductListComponent implements OnInit {
  private readonly store = inject(Store);
  private readonly route = inject(ActivatedRoute);
  protected products$ = this.store.select(selectFilterProducts);
  protected loading$ = this.store.select(loadingSpinner);
  protected viewport = viewChild(CdkVirtualScrollViewport);

  constructor() {
    this.store.dispatch(ProductsActions.loadProducts());
  }
  ngOnInit(): void {
    // console.log(this.route?.snapshot?.paramMap)
    // const gender = this.route?.snapshot?.paramMap.get(
    //   FilterOptions.GENDER
    // ) as FilterOptions;
    // if (gender)
    //   this.store.dispatch(
    //     NavigationActions.navigate({
    //       opt: FilterOptions.GENDER,
    //       query: [gender],
    //     })
    //   );
  }
}
