import { Route } from '@angular/router';

export default [
  {
    path: 'cart',
    loadComponent: () =>
      import('./cart.component').then((mod) => mod.CartComponent),
  },
] satisfies Route[];
