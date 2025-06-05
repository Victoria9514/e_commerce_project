import { Routes } from '@angular/router';
import { PageNotFoundComponent } from '../components/page-not-found/page-not-found.component';

export const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('../routes/auth.routes'),
  },
  {
    path: 'home',
    title: 'Home Page',
    loadComponent: () =>
      import('../components/product/product-list/product-list.component').then(
        (m) => m.ProductListComponent
      ),
  },
  {
    path: 'admin',
    title: 'Admin',
    loadChildren: () => import('../routes/admin.routes'),
  },
  {
    path: 'p',
    loadChildren: () => import('../routes/product.routes'),
  },
  {
    path: 'c',
    loadChildren: () => import('../routes/navigation.routes'),
  },


  // {
  //   path: 'products/:category',
  //   loadComponent: () =>
  //     import('../components/product/product-list/product-list.component').then(
  //       (m) => m.ProductListComponent
  //     ),
  // },
  {
    title: 'Cart',
    path: '',
    loadChildren: () => import('../routes/cart.routes'),
  },
  {
    path: '',
    loadChildren: () => import('../routes/user.routes'),
  },

  // {
  //   path: 'profile',
  //   title: 'Profile',
  //   component: ProfileComponent,
  //   loadChildren: () => import('../components/user/user.routes'),
  //   canActivate: [AuthGuardService],
  // },
  { path: '**', pathMatch: 'full', component: PageNotFoundComponent },
  // {path : 'admin', component: AdminComponent,canActivate: [AuthGuard]},
];
