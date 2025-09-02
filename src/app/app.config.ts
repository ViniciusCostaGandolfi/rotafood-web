import { ApplicationConfig, LOCALE_ID, isDevMode } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import {  authInterceptor } from './core/interceptors/auth.interceptor';
import { DecimalPipe, registerLocaleData } from '@angular/common';
import localePt from '@angular/common/locales/pt';
import { provideClientHydration } from '@angular/platform-browser';


registerLocaleData(localePt, 'pt-BR');


export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideAnimationsAsync(),
    provideHttpClient(
        withFetch(),
        withInterceptors([
            authInterceptor
        ])
    ),
    { provide: LOCALE_ID, useValue: 'pt-BR' },
    {
        provide: DecimalPipe,
        useFactory: () => {
            const pipe = new DecimalPipe('pt-BR');
            return pipe;
        },
    }, provideClientHydration()
]
};
