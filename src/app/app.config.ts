import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { authInterceptor } from './interceptors/auth.interceptor.service';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    // for api calling
    // here interceptors is same of middleware in api so i need it to catch the req and res (control the req and res between client and server)
    provideHttpClient(withFetch(),withInterceptors([authInterceptor])),
    
  ]
};
