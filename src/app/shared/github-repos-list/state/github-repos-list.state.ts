import { Action, Selector, State, StateContext, Store } from '@ngxs/store';

import { PageEvent } from '@angular/material/paginator';
import { Sort } from '@angular/material/sort';
import {
  GithubListSetPagination,
  GithubListSetSotring,
} from './github-repos-list.actions';
import { Injectable } from '@angular/core';

export interface GithubReposListStateModel {
  paginator: PageEvent;
  sort: Sort;
}

export const initialState: GithubReposListStateModel = {
  paginator: { pageIndex: 1, pageSize: 10, length: 0 },
  sort: { active: 'name', direction: 'asc' },
};

@State<GithubReposListStateModel>({
  name: 'githubReposList',
  defaults: initialState,
})
@Injectable()
export class GithubReposListState {
  @Selector()
  static getPaginator(state: GithubReposListStateModel): PageEvent {
    return state.paginator;
  }

  @Selector()
  static getSort(state: GithubReposListStateModel): Sort {
    return state.sort;
  }

  @Action(GithubListSetPagination)
  githubListSetPagination(
    ctx: StateContext<PageEvent>,
    action: GithubListSetPagination
  ): void {
    ctx.patchState({
      ...action.payload,
    });
  }

  @Action(GithubListSetSotring)
  githubListSetSotring(
    ctx: StateContext<Sort>,
    action: GithubListSetSotring
  ): void {
    ctx.patchState({
      ...action.payload,
    });
  }
}
