import {ApplicationConfig, provideBrowserGlobalErrorListeners} from '@angular/core';
import {authInterceptor} from '../interceptors/auth-interceptor';
import {provideHttpClient, withInterceptors} from '@angular/common/http';
import {provideRouter} from '@angular/router';
import {provideToastr} from 'ngx-toastr';
import {routes} from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideHttpClient(withInterceptors([authInterceptor])),
    provideToastr()
  ]
};
