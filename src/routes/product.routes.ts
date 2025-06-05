import { Route } from '@angular/router';
import { ProductDetailComponent } from '../components/product/product-detail/product-detail.component';

export default [
  {
    path: ':id',
    children: [
      {
        path: '',
        component: ProductDetailComponent,
      },
    ],
  },
] satisfies Route[];
