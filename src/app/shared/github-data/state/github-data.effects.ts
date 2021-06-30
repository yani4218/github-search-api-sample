import { Injectable } from '@angular/core';

import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';

import { of, merge } from 'rxjs';
import { catchError, switchMap, withLatestFrom, map } from 'rxjs/operators';
import {
  getPaginator,
  githubListSetPagination,
} from '../../github-repos-list/state';
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

  getGithubReposList$ = createEffect(() =>
    this._actions$.pipe(
      ofType(githubListGetData, githubListSetPagination),
      withLatestFrom(this._store.select(getPaginator)),
      switchMap(([action, paginator]) =>
        this._githubSource.getRepos('ang', paginator).pipe(
          map((data) => githubListGetDataSuccess(data)),
          catchError((error: any) => of(githubListGetDataFailure(error)))
        )
      )
    )
  );
}
