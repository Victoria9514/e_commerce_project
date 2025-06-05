import { Route } from '@angular/router';

export default [
  {
    path: 'login',
    loadComponent: () =>
      import('../components/auth/login-page/login-page.component').then((mod) => mod.LoginPageComponent),
  },
  {
    path: 'register',
    loadComponent: () =>
      import('../components/auth/register/register/register.component').then(
        (mod) => mod.RegisterComponent
      ),
  },
] satisfies Route[];
