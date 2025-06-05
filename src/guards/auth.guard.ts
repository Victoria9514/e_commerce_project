import { inject } from '@angular/core';
import { CanActivateFn, Router, UrlTree } from '@angular/router';
import { AuthService } from '@services/auth.service';

// @Injectable({
//   providedIn: 'root',
// })
// export class AuthGuardService implements CanActivate {
//   private authService = inject(AuthService);

//   canActivate(): Observable<boolean> | boolean {
//     if (this.authService?.user()) return true;
//     else {
//       this.authService.logout();
//       return false;
//     }
//   }
// }

const authGuard: CanActivateFn = (): boolean | UrlTree => {
  const authService = inject(AuthService);
  const router = inject(Router);
  return authService?.user() !== null || router.createUrlTree(['/login']);
};
