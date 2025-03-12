import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, WritableSignal, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AuthActions } from '../components/auth/store/auth.actions';
import { IUser } from '../models/user.model';
import { LocalStorageService } from './localStorage.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  http = inject(HttpClient);
  router = inject(Router);
  jwtHelper = new JwtHelperService();
  localStorage = inject(LocalStorageService);
  store = inject(Store);

  // TODO FIX LOCALSTORAGE USER->TOKEN
  get token(): string | null {
    return this.localStorage.get('user');
  }

  get user(): WritableSignal<IUser | null> {
    const user = JSON.parse(this.localStorage.get('user'));
    return signal(this.jwtHelper.decodeToken(user.token)) || null;
  }

  register(user: Partial<IUser>): Observable<IUser> {
    return this.http.post<IUser>('http://localhost:3300/register', user, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'access-control-allow-origin': '*',
      }),
    });
  }

  login(username: string, password: string): Observable<IUser> {
    return this.http.post<IUser>('http://localhost:3300/login', {
      username,
      password,
    });
    // .pipe(
    //   catchError((error) => {
    //     if (error.status === 401) {
    //       console.log(error);
    //     }
    //     return of(error);
    //     // return of(User);
    //   }),
    //   tap((user) => {
    //     console.log(user);
    //     this.localStorage.set('user', JSON.stringify(user));
    //     return user;
    //   })
    // );
  }

  logout() {
    localStorage.clear();
    this.store.dispatch(AuthActions.logOutUser());
    this.router.navigate(['/login']);
  }
}
