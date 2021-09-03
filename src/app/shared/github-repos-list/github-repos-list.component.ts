import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';

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
import { catchError, switchMap } from 'rxjs/operators';
import { SearchStore } from '../search/state';

@UntilDestroy()
@Component({
  selector: 'app-github-repos-list',
  templateUrl: './github-repos-list.component.html',
  styleUrls: ['./github-repos-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GithubReposListComponent implements OnInit {
  search$: Observable<string> = this._searchStore.selectSearchText();

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
    private readonly _actions: Actions,
    private readonly _searchStore: SearchStore
  ) {}

  ngOnInit(): void {
    this.search$
      .pipe(
        catchError((e) => {
          console.log(e);
          return e;
        })
      )
      .subscribe((v) => v);
  }

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
