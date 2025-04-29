import { Route } from '@angular/router';

export default [
  {
        path: 'wishlist',
        loadComponent: () =>
          import('../favorites/favorites.component').then(
            (mod) => mod.FavoritesComponent
          ),
      },
      {
        path: 'cart',
        loadComponent: () =>
          import('../cart/cart-list.component').then(
            (mod) => mod.CartListComponent
          ),
      },
      {
        path: 'checkout/account',
        loadComponent: () =>
          import('./account/account.component').then((mod) => mod.AccountComponent),
      },
      {
        path: 'checkout',
        loadComponent: () =>
          import('./checkout/checkout.component').then((mod) => mod.CheckoutComponent),
      },
] satisfies Route[];
