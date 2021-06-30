import { NgModule } from '@angular/core';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { reducers } from './app-store';
import { GitHubListEffects } from '../github-data/state';
import { environment } from 'src/environments/environment';

@NgModule({
  declarations: [],
  imports: [
    StoreModule.forRoot(reducers),
    EffectsModule.forRoot([GitHubListEffects]),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
    }),
  ],
})
export class AppStoreModule {}
