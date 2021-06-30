import { Component, ChangeDetectionStrategy } from '@angular/core';

import { PageEvent } from '@angular/material/paginator';
import { Sort } from '@angular/material/sort';
import { Store } from '@ngrx/store';

import { AppState } from '../store/app-store';

import {
  getGitHubDataList,
  getGitHubDataListTotal,
} from '../github-data/state/github-data.selectors';
import {
  githubListSetSotring,
  getPaginator,
  getSort,
  githubListSetPagination,
} from './state';

@Component({
  selector: 'app-github-repos-list',
  templateUrl: './github-repos-list.component.html',
  styleUrls: ['./github-repos-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GithubReposListComponent {
  repos$ = this._store.select(getGitHubDataList);
  totalItems$ = this._store.select(getGitHubDataListTotal);
  paginator$ = this._store.select(getPaginator);
  sort$ = this._store.select(getSort);

  pageSizeOptions = [5, 10, 20];
  displayedColumns = ['name', 'stargazers_count'];
  constructor(private _store: Store<AppState>) {}

  getPage(page: PageEvent): void {
    this._store.dispatch(githubListSetPagination(page));
  }

  onSortChange(sort: Sort): void {
    this._store.dispatch(githubListSetSotring(sort));
  }
}
