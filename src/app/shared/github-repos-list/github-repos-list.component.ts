import { Component, ChangeDetectionStrategy } from '@angular/core';

import { Observable } from 'rxjs';

import { Actions, ofActionCompleted, Select } from '@ngxs/store';
import { Store } from '@ngxs/store';

import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

import { PageEvent } from '@angular/material/paginator';
import { Sort } from '@angular/material/sort';

import { GithubDataState, GithubListGetData } from '../github-data/state';
import { IGitHubRepo } from '../github-data/entities';
import { GithubReposListState } from './state/github-repos-list.state';
import {
  GithubListSetPagination,
  GithubListSetSotring,
} from './state/github-repos-list.actions';
import { switchMap } from 'rxjs/operators';

@UntilDestroy()
@Component({
  selector: 'app-github-repos-list',
  templateUrl: './github-repos-list.component.html',
  styleUrls: ['./github-repos-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GithubReposListComponent {
  @Select(GithubDataState.getGitHubDataList)
  repos$: Observable<IGitHubRepo[]>;

  @Select(GithubDataState.getGitHubDataListTotal)
  totalItems$: Observable<number>;

  @Select(GithubReposListState.getPaginator)
  paginator$: Observable<PageEvent>;

  @Select(GithubReposListState.getSort)
  sort$: Observable<Sort>;

  pageSizeOptions = [5, 10, 20];
  displayedColumns = ['name', 'stargazers_count'];

  constructor(
    private readonly _store: Store,
    private readonly _actions: Actions
  ) {}

  getPage(page: PageEvent): void {
    this._store
      .dispatch(new GithubListSetPagination(page))
      .pipe(
        switchMap((_) =>
          this._actions.pipe(ofActionCompleted(GithubListSetPagination))
        ),
        switchMap((_) => this._store.dispatch(new GithubListGetData())),
        untilDestroyed(this)
      )
      .subscribe();
  }

  onSortChange(sort: Sort): void {
    this._store
      .dispatch(new GithubListSetSotring(sort))
      .pipe(
        switchMap((_) =>
          this._actions.pipe(ofActionCompleted(GithubListSetSotring))
        ),
        switchMap((_) => this._store.dispatch(new GithubListGetData())),
        untilDestroyed(this)
      )
      .subscribe();
  }
}
