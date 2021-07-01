import { ActionReducer, ActionReducerMap, MetaReducer } from '@ngrx/store';
import { localStorageSync } from 'ngrx-store-localstorage';

import * as fromGithubData from '../github-data/state/github-data.reducers';
import * as fromGithubReposList from '../github-repos-list/state/github-repos-list.reducers';
import * as fromGithubSearch from '../search/state/github-data.reducers';

export interface AppState {
  githubData: fromGithubData.GithubDataState;
  githubReposList: fromGithubReposList.GithubReposListState;
  githubSearch: fromGithubSearch.GithubSearchState;
}

export const reducers: ActionReducerMap<AppState> = {
  githubReposList: fromGithubReposList.reducer,
  githubData: fromGithubData.reducer,
  githubSearch: fromGithubSearch.reducer,
};

export function localStorageSyncReducer(
  reducer: ActionReducer<any>
): ActionReducer<any> {
  return localStorageSync({
    keys: ['githubReposList', 'githubSearch'],
    rehydrate: true,
  })(reducer);
}
export const metaReducers: Array<MetaReducer<any, any>> = [
  localStorageSyncReducer,
];
