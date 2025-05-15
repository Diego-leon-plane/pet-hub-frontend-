import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withInterceptorsFromDi, withInterceptors } from '@angular/common/http';
import { importProvidersFrom } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { routes } from './app.routes';
import { provideClientHydration, withEventReplay, withIncrementalHydration } from '@angular/platform-browser';
import { authInterceptor } from './interceptors/auth.interceptors';

export const appConfig: ApplicationConfig = {
  providers: [
     provideZoneChangeDetection({ eventCoalescing: true }),
     provideRouter(routes),
     provideClientHydration(withIncrementalHydration(), withEventReplay()),
     provideHttpClient(withInterceptorsFromDi(), withInterceptors([authInterceptor])),
     importProvidersFrom(FormsModule), 
     importProvidersFrom(ReactiveFormsModule) 
    ]
};
