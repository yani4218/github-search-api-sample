import { NgModule } from '@angular/core';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { reducers, metaReducers } from './app-store';
import { GitHubListEffects } from '../github-data/state';

@NgModule({
  declarations: [],
  imports: [
    StoreModule.forRoot(reducers, { metaReducers }),
    EffectsModule.forRoot([GitHubListEffects]),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
    }),
  ],
})
export class AppStoreModule {}
