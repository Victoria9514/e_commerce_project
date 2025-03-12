import { NgOptimizedImage } from '@angular/common';
import { Component, OnInit, ViewEncapsulation, inject } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { PushPipe } from '@ngrx/component';
import { Store } from '@ngrx/store';
import { ButtonComponent } from '../../../common/button/button.component';
import { IProduct } from '../../../models/product.model';
import { CartActions } from '../../cart/store/actions';
import { ProductsActions } from '../store/product.actions';
import { selectCurrentProduct } from '../store/product.selector';
@Component({
    selector: 'app-product-detail',
    imports: [
        RouterModule,
        PushPipe,
        NgOptimizedImage,
        ButtonComponent,
        MatIconModule,
    ],
    templateUrl: './product-detail.component.html',
    styleUrl: './product-detail.component.scss',
    encapsulation: ViewEncapsulation.None
})
export class ProductdetailComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private store = inject(Store);
  product$ = this.store.select(selectCurrentProduct);

  ngOnInit(): void {
    const productId = this.route?.snapshot?.paramMap?.get('id');
    if (productId)
      this.store.dispatch(ProductsActions.getCurrentProduct({ productId }));
  }

  add(product: IProduct) {
    this.store.dispatch(CartActions.addCartItem({ product }));
  }
}
