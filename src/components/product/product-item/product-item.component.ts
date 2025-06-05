import {
  CommonModule,
  CurrencyPipe,
  NgOptimizedImage
} from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
  inject,
  input,
} from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIcon } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { IProduct } from '@models/product.model';
import { Store } from '@ngrx/store';

import { RouterModule } from '@angular/router';
import { ButtonComponent } from 'src/common/button/button.component';
import { ProductsActions } from '../../../store/actions/product.actions';
// import { selectFavorites } from '../store/product.selector';
@Component({
  selector: 'app-product-item',
  imports: [
    CommonModule,
    RouterModule,
    NgOptimizedImage,
    MatCardModule,
    MatIcon,
    MatSelectModule,
    CurrencyPipe,
    ButtonComponent,
  ],
  templateUrl: './product-item.component.html',
  styleUrl: './product-item.component.scss',
  // providers: [
  //   {
  //     provide: IMAGE_CONFIG,
  //     useValue: {
  //       breakpoints: [16, 48, 96, 128, 384, 640, 750, 828, 1080, 1200, 1920],
  //     },
  //   },
  // ],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'product-item' },
})
export class ProductItemComponent {
  private _store = inject(Store);
  product = input.required<IProduct>();

  protected toggleFavorite(id: string, inWishlist: boolean) {
    this._store.dispatch(ProductsActions.toggleFavorite({ id, inWishlist }));
  }
}
