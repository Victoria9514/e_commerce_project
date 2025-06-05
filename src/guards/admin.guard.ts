import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, map } from 'rxjs';
import { selectCurrentUser } from 'src/store/selectors/auth.selectors';

const adminGuard: CanActivateFn = (): Observable<boolean> => {
  const store = inject(Store);
  return store.select(selectCurrentUser).pipe(
    map((user) => {
      return user?.role.toLowerCase() === 'admin';
    })
  );
};
