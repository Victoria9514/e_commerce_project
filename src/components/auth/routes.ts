import { Route } from '@angular/router';

export default [
  {
    path: 'login',
    loadComponent: () =>
      import('../auth/login/login.component').then((mod) => mod.LoginComponent),
  },
  {
    path: 'register',
    loadComponent: () =>
      import('../auth/register/register/register.component').then(
        (mod) => mod.RegisterComponent
      ),
  },
] satisfies Route[];
