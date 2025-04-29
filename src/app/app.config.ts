import {
    ApplicationConfig,
    importProvidersFrom,
    isDevMode,
    provideZoneChangeDetection,
} from '@angular/core';
import { provideRouter } from '@angular/router';

import {
    provideHttpClient,
    withFetch,
    withInterceptorsFromDi,
} from '@angular/common/http';
import { MAT_SNACK_BAR_DEFAULT_OPTIONS } from '@angular/material/snack-bar';
import { provideAnimations } from '@angular/platform-browser/animations';
import { JwtModule } from '@auth0/angular-jwt';
import { provideEffects } from '@ngrx/effects';
import {
    provideState,
    provideStore
} from '@ngrx/store';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { adminEffects$ } from '../components/admin/store/admin.index';
import { authEffects$ } from '../components/auth/store/auth.index';
import { cartEffects$ } from '../components/cart/store';
import { productEffects$ } from '../components/product/store';
import { userEffects$ } from '../components/user/store';
import { storeEffects$ } from '../shared/spinner/store';
import {
    initialdFeatureKey,
    reducers,
} from '../shared/spinner/store/shared.reducers';
import { routes } from './app.routes';

// Define metaReducers array
// const metaReducers: Array<MetaReducer<any, any>> = [appStorageSyncReducer];
export const appConfig: ApplicationConfig = {
  providers: [
    {provide: MAT_SNACK_BAR_DEFAULT_OPTIONS, useValue: {duration: 2500}},
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideAnimations(),
    provideHttpClient(withFetch()),
    importProvidersFrom(
      JwtModule.forRoot({
        config: {
          tokenGetter: () => {
            return localStorage.getItem('token');
          },
          allowedDomains: ['http://localhost:4200/login', 'localhost:3300'],
          disallowedRoutes: ['http://localhost:4200/profile'],
        },
      })
    ),
    provideHttpClient(withInterceptorsFromDi()),
    provideStore(reducers),
    provideState({ name: initialdFeatureKey, reducer: reducers }),
    provideStoreDevtools({
      maxAge: 25, // Retains last 25 states
      logOnly: !isDevMode(), // Restrict extension to log-only mode
      autoPause: true, // Pauses recording actions and state changes when the extension window is not open
      trace: false, //  If set to true, will include stack trace for every dispatched action, so you can see it in trace tab jumping directly to that part of code
      traceLimit: 75, // maximum stack trace frames to be stored (in case trace option was provided as true)
      connectInZone: true, // If set to true, the connection is established within the Angular zone
    }),
    provideEffects(
      productEffects$,
      adminEffects$,
      authEffects$,
      userEffects$,
      storeEffects$,
      cartEffects$,
    ),
  ],
};
