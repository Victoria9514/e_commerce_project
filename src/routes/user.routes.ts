import { Route } from '@angular/router';

export default [
  {
        path: 'wishlist',
        loadComponent: () =>
          import('../components/favorites/favorites.component').then(
            (mod) => mod.FavoritesComponent
          ),
        },
      {
        path: 'cart',
        loadComponent: () =>
          import('../components/cart/cart-list.component').then(
            (mod) => mod.CartListComponent
          ),
      },
      {
        path: 'checkout/account',
        loadComponent: () =>
          import('../components/user/account/account.component').then((mod) => mod.AccountComponent),
      },
      {
        path: 'checkout',
        loadComponent: () =>
          import('../components/user/checkout/checkout.component').then((mod) => mod.CheckoutComponent),
      },

] satisfies Route[];
