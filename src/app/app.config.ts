import { ApplicationConfig} from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { reducers, metaReducers } from './store/store';
import { LayoutEffects } from './store/effects';
import {provideAnimations} from '@angular/platform-browser/animations'
import { provideHttpClient } from '@angular/common/http';
import { provideToastr } from 'ngx-toastr';


export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), provideStore(reducers,{metaReducers}), provideEffects([LayoutEffects]),provideAnimations(), provideHttpClient(), provideToastr()],
};
