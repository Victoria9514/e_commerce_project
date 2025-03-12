import { Route } from '@angular/router';

export default [
  {
    // path: ':username',
    // component: ProfileComponent,
    // children: [
    //   {
        path: 'wishlist',
        loadComponent: () =>
          import('../favorites/favorites.component').then(
            (mod) => mod.FavoritesComponent
          ),
      },
      {
        path: 'cart',
        loadComponent: () =>
          import('../cart/cart.component').then(
            (mod) => mod.CartComponent
          ),
      },
    // ],
  // },
] satisfies Route[];
