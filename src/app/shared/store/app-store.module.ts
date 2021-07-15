import { NgModule } from '@angular/core';

import { NgxsModule } from '@ngxs/store';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';
import { NgxsStoragePluginModule } from '@ngxs/storage-plugin';

import { GithubReposListState } from '../github-repos-list/state';
import { GithubSearchState } from '../search/state';
import { GithubDataState } from '../github-data/state';

@NgModule({
  imports: [
    NgxsModule.forRoot([
      GithubReposListState,
      GithubSearchState,
      GithubDataState,
    ]),
    NgxsReduxDevtoolsPluginModule.forRoot(),
    NgxsStoragePluginModule.forRoot({
      key: [GithubReposListState, GithubSearchState],
    }),
  ],
})
export class AppStoreModule {}
