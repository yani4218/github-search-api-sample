import { createAction, props } from '@ngrx/store';
import { GithubSearchState } from './github-data.reducers';

export const GITHUB_SEARCH_SET_TEXT = '[Github Search] Set text';

export const githubDataSearchSetText = createAction(
  GITHUB_SEARCH_SET_TEXT,
  props<GithubSearchState>()
);
