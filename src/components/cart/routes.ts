import { Route } from '@angular/router';

export default [
  {
    path: 'cart',
    loadComponent: () =>
      import('./cart-list.component').then((mod) => mod.CartListComponent),
  },
] satisfies Route[];
