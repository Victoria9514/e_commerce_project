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
import { Store, select } from '@ngrx/store';
import { SpinnerComponent } from '@shared/spinner/spinner.component';
import { Subject } from 'rxjs';
import { ProductGender } from '../../../models/product.model';
import { AppState } from '../../../models/states.models';
import { ProductItemComponent } from '../product-item/product-item.component';
import { ProductsActions } from '../store/product.actions';
import { selectProducts } from '../store/product.selector';

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
  private readonly store = inject(Store<AppState>);
  private route = inject(ActivatedRoute);
  products$ = this.store.pipe(select(selectProducts));
  protected deactivatedSubject: Subject<boolean> = new Subject<boolean>();
  protected _viewport = viewChild(CdkVirtualScrollViewport);

  itemHeight = 200;
  filterByGender: any;
  idTrackFn = (product_id: number) => product_id;

  constructor() {
    this.store.dispatch(ProductsActions.loadProducts());
  }
  ngOnInit(): void {
    const gender: ProductGender = this.route?.snapshot?.paramMap.get(
      'gender'
    ) as ProductGender;
    // if (gender)
    //   this.store.dispatch(ProductsActions.navigateToToGender({ gender }));
    // console.log(this._viewport());
    if (this._viewport())
      this._viewport()?.setTotalContentSize(
       13 * this.itemHeight
      );
    this._viewport()?.checkViewportSize()

  }

  // setTotalContentSize(size: number) {
  //   if (this._viewport().conten !== size) {
  //     this._totalContentSize = size;
  //     this._calculateSpacerSize();
  //     this._markChangeDetectionNeeded();
  //   }
  // }
}
