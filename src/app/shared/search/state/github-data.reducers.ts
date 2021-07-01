import { Action, createReducer, on } from '@ngrx/store';
import { githubDataSearchSetText } from './github-data.actions';

export interface GithubSearchState {
  search: string;
}

export const initialState: GithubSearchState = {
  search: '',
};

const githubSearchReducer = createReducer(
  initialState,
  on(githubDataSearchSetText, (state, payload) => ({
    ...state,
    search: payload.search,
  }))
);

export function reducer(
  state: GithubSearchState | undefined,
  action: Action
): any {
  return githubSearchReducer(state, action);
}
