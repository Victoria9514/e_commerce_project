import { CommonModule, IMAGE_CONFIG, NgOptimizedImage } from '@angular/common';
import {
  Component,
  ViewEncapsulation,
  inject,
  input
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIcon } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { Store } from '@ngrx/store';
import { Product } from '../../../models/product.model';

import { RouterModule } from '@angular/router';
import { ProductsActions } from '../store/product.actions';
// import { selectFavorites } from '../store/product.selector';
@Component({
    selector: 'app-product-item',
    imports: [
        CommonModule,
        RouterModule,
        NgOptimizedImage,
        MatCardModule,
        MatIcon,
        MatButtonModule,
        MatSelectModule,
    ],
    templateUrl: './product-item.component.html',
    styleUrl: './product-item.component.scss',
    providers: [
        {
            provide: IMAGE_CONFIG,
            useValue: {
                breakpoints: [16, 48, 96, 128, 384, 640, 750, 828, 1080, 1200, 1920],
            },
        },
    ],
    encapsulation: ViewEncapsulation.None,
    host: { class: 'product-item' }
})
export class ProductItemComponent {
  store = inject(Store);
  product = input.required<Product>();

  likeChanged(id: string, isAdded: boolean) {
    this.store.dispatch(ProductsActions.toggleFavorite({ id , isAdded}));
  }
}
