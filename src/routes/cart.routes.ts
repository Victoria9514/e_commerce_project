import { Route } from '@angular/router';

export default [
  {
    path: 'cart',
    loadComponent: () =>
      import('../components/cart/cart-list.component').then((mod) => mod.CartListComponent),
  },
] satisfies Route[];
