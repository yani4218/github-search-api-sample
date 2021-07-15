import { AfterViewInit, Component } from '@angular/core';

import { Store } from '@ngxs/store';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

import { GithubListGetData } from './shared/github-data/state';

@UntilDestroy()
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements AfterViewInit {
  constructor(private _store: Store) {}

  ngAfterViewInit(): void {
    this._store
      .dispatch(new GithubListGetData())
      .pipe(untilDestroyed(this))
      .subscribe();
  }
}
