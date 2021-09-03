import {
  Action,
  Select,
  Selector,
  State,
  StateContext,
  Store,
} from '@ngxs/store';
import { Observable, of } from 'rxjs';
import { catchError, map, switchMap, withLatestFrom } from 'rxjs/operators';

import { GithubDataService } from '../github-data.service';

import {
  GithubListGetData,
  GithubListGetDataFailure,
  GithubListGetDataSuccess,
} from './github-data.actions';

import { IGitHubRepo, IList } from '../entities/github-data.interface';

import { GithubReposListState } from '../../github-repos-list/state';
import { PageEvent } from '@angular/material/paginator';
import { Injectable } from '@angular/core';
import { SearchStore } from '../../search/state';

export interface GithubDataStateModel extends IList<IGitHubRepo> {}

export const initialState: IList<IGitHubRepo> = {
  items: [],
  total_count: 0,
  incomplete_results: false,
};

@State<GithubDataStateModel>({
  name: 'githubData',
  defaults: initialState,
})
@Injectable()
export class GithubDataState {
  search$: Observable<string> = this._searchStore.selectSearchText();

  @Select(GithubReposListState.getPaginator)
  paginator$: Observable<PageEvent>;

  constructor(
    private _store: Store,
    private _githubSource: GithubDataService,
    private _searchStore: SearchStore
  ) {}

  @Selector()
  static getGitHubDataList(state: GithubDataStateModel): IGitHubRepo[] {
    return state.items;
  }

  @Selector()
  static getGitHubDataListTotal(state: GithubDataStateModel): number {
    return state.total_count;
  }

  @Action(GithubListGetData)
  githubListGetData(
    ctx: StateContext<IList<IGitHubRepo>>,
    action: GithubListGetData
  ): Observable<any> {
    return this.paginator$.pipe(
      withLatestFrom(this.search$),
      switchMap(([paginator, search]) => {
        return this._githubSource.getRepos(search, paginator);
      }),
      map((data) => this._store.dispatch(new GithubListGetDataSuccess(data))),
      catchError((error: any) =>
        this._store.dispatch(new GithubListGetDataSuccess(error))
      )
    );
  }

  @Action(GithubListGetDataSuccess)
  githubListGetDataSuccess(
    ctx: StateContext<IList<IGitHubRepo>>,
    action: GithubListGetDataSuccess
  ): void {
    ctx.patchState({
      ...action.payload,
    });
  }

  @Action(GithubListGetDataFailure)
  githubListGetDataFailure(
    ctx: StateContext<any>,
    action: GithubListGetDataFailure
  ): void {
    ctx.patchState({
      ...action.payload,
    });
  }
}
