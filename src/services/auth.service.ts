import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, WritableSignal, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { IUser } from '@models/user.model';
import { Store } from '@ngrx/store';
import { LocalStorageService } from '@services/localStorage.service';
import { Observable } from 'rxjs';
import { STATIC_URLS } from 'src/utils';
import { AuthActions } from '../store/actions/auth.actions';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private http = inject(HttpClient);
  private router = inject(Router);
  private jwtHelper = new JwtHelperService();
  private localStorage = inject(LocalStorageService);
  private store = inject(Store);

  // TODO FIX LOCALSTORAGE USER->TOKEN
  get token(): string | null {
    return this.localStorage.get('user');
  }

  get user(): WritableSignal<IUser | null> {
    const user = JSON.parse(this.localStorage.get('user'));
    return signal(this.jwtHelper.decodeToken(user.token)) || null;
  }

  register(user: Partial<IUser>): Observable<IUser> {
    return this.http.post<IUser>(STATIC_URLS.REGISTERUSER, user, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'access-control-allow-origin': '*',
      }),
    });
  }

  login(username: string, password: string): Observable<IUser> {
    return this.http.post<IUser>(STATIC_URLS.LOGINUSER, {
      username,
      password,
    });
  }

  logout() {
    localStorage.clear();
    this.store.dispatch(AuthActions.logOutUser());
    this.router.navigate(['/login']);
  }
}
