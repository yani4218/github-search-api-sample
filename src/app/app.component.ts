import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { UntilDestroy } from '@ngneat/until-destroy';

import { Subscription } from 'rxjs';

import { DataSourceService, IGitHubRepo } from './shared/data-sorce';
import { ErrorComponent } from './shared/error/error.component';

@UntilDestroy({ checkProperties: true })
@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {
    private _gitReposSubscription: Subscription = new Subscription();

    repos: IGitHubRepo[] = [];

    constructor(
        private _dataSource: DataSourceService,
        public matDialog: MatDialog
    ) { }

    onSearch(search: string): void {
        if (this._gitReposSubscription) {
            this._gitReposSubscription.unsubscribe();
        }

        if (!search) {
            this.repos = [];
            return;
        }

        this._gitReposSubscription = this.getReposList(search);
    }

    private getReposList(search: string): Subscription {
        return this._dataSource.getRepos(search)
            .subscribe(
                repos => this.repos = repos,
                errorResp => this.openErrorDialog(errorResp?.error?.message)
            );
    }

    private openErrorDialog(message: string): void {
        this.matDialog.open(ErrorComponent, {
            data: { message }
        });
    }
}
