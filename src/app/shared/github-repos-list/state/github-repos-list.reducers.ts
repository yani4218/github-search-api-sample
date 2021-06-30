import { PageEvent } from '@angular/material/paginator';
import { Sort } from '@angular/material/sort';
import { Action, createReducer, on } from '@ngrx/store';
import {
  githubListSetPagination,
  githubListSetSotring,
} from './github-repos-list.actions';

export interface GithubReposListState {
  paginator: PageEvent;
  sort: Sort;
}

export const initialState: GithubReposListState = {
  paginator: { pageIndex: 1, pageSize: 10, length: 0 },
  sort: { active: 'name', direction: 'asc' },
};

const githubListReducer = createReducer(
  initialState,
  on(githubListSetPagination, (state, paginator) => ({ ...state, paginator })),
  on(githubListSetSotring, (state, sort) => ({ ...state, sort }))
);

export function reducer(
  state: GithubReposListState | undefined,
  action: Action
): any {
  return githubListReducer(state, action);
}
