import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { UntilDestroy } from '@ngneat/until-destroy';

import { IGitHubRepo, IList } from './shared/github-data';
import { Store } from '@ngrx/store';
import { AppState } from './shared/store/app-store';
import {
  githubListGetData,
  githubListGetDataSuccess,
  initialState,
} from './shared/github-data/state';

@UntilDestroy({ checkProperties: true })
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  repos: IList<IGitHubRepo>;

  constructor(private _store: Store<AppState>) {}

  onSearch(search: string): void {
    if (!search) {
      this._store.dispatch(
        githubListGetDataSuccess(initialState.githubReposList)
      );
      return;
    }

    this._store.dispatch(githubListGetData({ search }));
  }
}
