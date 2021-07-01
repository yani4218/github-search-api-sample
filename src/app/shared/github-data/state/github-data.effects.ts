import { Injectable } from '@angular/core';

import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';

import { of, zip } from 'rxjs';
import { catchError, switchMap, map } from 'rxjs/operators';
import {
  getPaginator,
  githubListSetPagination,
} from '../../github-repos-list/state';
import { getGitHubDataSearch } from '../../search/state';
import { githubDataSearchSetText } from '../../search/state/github-data.actions';
import { AppState } from '../../store/app-store';

import { GithubDataService } from '../github-data.service';
import {
  githubListGetData,
  githubListGetDataFailure,
  githubListGetDataSuccess,
} from './github-data.actions';

@Injectable()
export class GitHubListEffects {
  constructor(
    private _store: Store<AppState>,
    private _actions$: Actions,
    private _githubSource: GithubDataService
  ) {}

  combineSelectors$ = zip(
    this._store.select(getGitHubDataSearch),
    this._store.select(getPaginator)
  );

  getGithubReposList$ = createEffect(() =>
    this._actions$.pipe(
      ofType(
        githubListGetData,
        githubListSetPagination,
        githubDataSearchSetText
      ),
      switchMap(() => this.combineSelectors$),
      switchMap(([search, paginator]) =>
        this._githubSource.getRepos(search, paginator).pipe(
          map((data) => githubListGetDataSuccess(data)),
          catchError((error: any) => of(githubListGetDataFailure(error)))
        )
      )
    )
  );
}
