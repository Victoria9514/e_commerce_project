import { Injectable, inject } from '@angular/core';
import { CanActivate } from '@angular/router';
import { AuthService } from '@services/auth.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthGuardService implements CanActivate {
  private authService = inject(AuthService);

  canActivate(): Observable<boolean> | boolean {
    if (this.authService?.user()) return true;
    else {
      this.authService.logout();
      return false;
    }
  }
}

