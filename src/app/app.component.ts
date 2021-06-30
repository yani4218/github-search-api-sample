import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { UntilDestroy } from '@ngneat/until-destroy';

import { Subscription } from 'rxjs';

import { GithubDataService, IGitHubRepo, IList } from './shared/github-data';
import { ErrorComponent } from './shared/error/error.component';
import { IPagination } from './shared/github-repos-list/entites/pagination.interface';

@UntilDestroy({ checkProperties: true })
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  private _gitReposSubscription: Subscription = new Subscription();
  private _pagination: IPagination = { pageIndex: 1, pageSize: 10 };

  repos: IList<IGitHubRepo>;

  constructor(
    private _githubSource: GithubDataService,
    public matDialog: MatDialog
  ) {}

  onSearch(search: string): void {
    if (this._gitReposSubscription) {
      this._gitReposSubscription.unsubscribe();
    }

    if (!search) {
      this.repos = { items: [], total_count: 0, incomplete_results: false };
      return;
    }

    this._gitReposSubscription = this.getReposList(search);
  }

  private getReposList(search: string): Subscription {
    return this._githubSource.getRepos(search, this._pagination).subscribe(
      (repos) => (this.repos = repos),
      (errorResp) => this.openErrorDialog(errorResp?.error?.message)
    );
  }

  private openErrorDialog(message: string): void {
    this.matDialog.open(ErrorComponent, {
      data: { message },
    });
  }
}
