import { AfterViewInit, Component } from '@angular/core';
import { Store } from '@ngrx/store';

import { githubListGetData } from './shared/github-data/state/github-data.actions';
import { AppState } from './shared/store/app-store';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements AfterViewInit {
  constructor(private _store: Store<AppState>) {}

  ngAfterViewInit(): void {
    this._store.dispatch(githubListGetData());
  }
}
