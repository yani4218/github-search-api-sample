import { NgModule } from '@angular/core';

import { NgxsModule } from '@ngxs/store';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';
import { NgxsStoragePluginModule } from '@ngxs/storage-plugin';

import { GithubReposListState } from '../github-repos-list/state';
import { GithubDataState } from '../github-data/state';
import { StateProviderModule } from '../custom-store/root';
import { SearchStore } from '../search/state';

@NgModule({
  imports: [
    NgxsModule.forRoot([GithubReposListState, GithubDataState]),
    NgxsReduxDevtoolsPluginModule.forRoot(),
    NgxsStoragePluginModule.forRoot({
      key: [GithubReposListState],
    }),
    StateProviderModule.forRoot({
      clientStore: true,
      sessionStorage: false,
    }),
  ],
  providers: [SearchStore],
})
export class AppStoreModule {}
