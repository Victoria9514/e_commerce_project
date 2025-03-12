import { Routes } from '@angular/router';
import { PageNotFoundComponent } from '../components/page-not-found/page-not-found.component';
import { ProfileComponent } from '../components/user/profile/profile.component';

export const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('../components/auth/routes'),
  },
  {
    path: 'main',
    title: 'Main Page',
    loadComponent: () =>
      import('../components/product/product-list/product-list.component').then(
        (m) => m.ProductListComponent
      ),
  },
  {
    path: 'admin',
    loadChildren: () => import('../components/admin/admin.routes'),
  },
  {
    path: 'main/:id',
    loadComponent: () =>
      import(
        '../components/product/product-detail/product-detail.component'
      ).then((c) => c.ProductdetailComponent),
    children: [
      {
        path: 'main/:women',
        component: ProfileComponent,
      },
    ],
  },

  {
    path: 'products/:gender',
    loadComponent: () =>
      import('../components/product/product-list/product-list.component').then(
        (m) => m.ProductListComponent
      ),
  },
  {
    path: '',
    loadChildren: () => import('../components/cart/routes'),
  },
  {
    path: '',
    loadChildren: () => import('../components/user/user.routes'),
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
