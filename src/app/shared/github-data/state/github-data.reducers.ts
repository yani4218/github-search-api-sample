import { Action, createReducer, on } from '@ngrx/store';
import { IGitHubRepo, IList } from '../entities/github-data.interface';
import {
  githubListGetDataFailure,
  githubListGetDataSuccess,
} from './github-data.actions';

export interface GithubDataState {
  githubReposList: IList<IGitHubRepo>;
}

export const initialState: GithubDataState = {
  githubReposList: { items: [], total_count: 0, incomplete_results: false },
};

const githubListReducer = createReducer(
  initialState,
  on(githubListGetDataSuccess, (state, githubReposList) => {
    console.log(state, githubReposList);
    return { ...state, githubReposList };
  }),
  on(githubListGetDataFailure, (state, errors) => ({ ...state, errors }))
);

export function reducer(
  state: GithubDataState | undefined,
  action: Action
): any {
  return githubListReducer(state, action);
}
