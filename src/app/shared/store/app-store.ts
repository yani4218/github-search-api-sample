import { ActionReducerMap, MetaReducer } from '@ngrx/store';

import { GithubDataState } from '../github-data/state';
import { GithubReposListState } from '../github-repos-list/state';

import * as fromGithubData from '../github-data/state/github-data.reducers';
import * as fromGithubReposList from '../github-repos-list/state/github-repos-list.reducers';

export interface AppState {
  githubReposList: GithubReposListState;
  githubData: GithubDataState;
}

export const reducers: ActionReducerMap<AppState> = {
  githubReposList: fromGithubReposList.reducer,
  githubData: fromGithubData.reducer,
};

// export const metaReducers: MetaReducer<AppState>[] = !environment.production
//   ? [debug, localStorageSyncReducer]
//   : [localStorageSyncReducer];
