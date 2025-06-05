import { Route } from '@angular/router';
import { ProductListComponent } from '@components/product/product-list/product-list.component';

export default [
  {
    path: ':gender',
    children: [
      {
        path: '',
        component: ProductListComponent,
        children: [
          {
            path: '',
            component: ProductListComponent,
          },
        ],
      },
    ],
  },
] satisfies Route[];
