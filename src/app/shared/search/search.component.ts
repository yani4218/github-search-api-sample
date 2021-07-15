import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

import { EMPTY, Observable } from 'rxjs';
import {
  debounceTime,
  distinctUntilChanged,
  filter,
  first,
  switchMap,
} from 'rxjs/operators';

import { Actions, ofActionCompleted, Select, Store } from '@ngxs/store';

import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

import { GithubSearchState } from './state/search.state';
import { GithubDataSearchSetText } from './state/search.actions';
import { GithubListGetData } from '../github-data/state';

@UntilDestroy()
@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchComponent implements OnInit {
  @Select(GithubSearchState.getGitHubDataSearch)
  search$: Observable<string>;

  errorMessage = '';

  searchForm: FormGroup;

  get searchFormControls(): { [key: string]: AbstractControl } {
    return this.searchForm && this.searchForm.controls;
  }

  get hasError(): boolean {
    return this.searchFormControls.searchText.invalid;
  }

  constructor(
    private readonly _store: Store,
    private readonly _actions: Actions
  ) {}

  ngOnInit(): void {
    this.initForm();
    this.initSearchControlListener();
  }

  private initForm(): void {
    this.search$.pipe(first()).subscribe((initValue) => {
      this.searchForm = new FormGroup({
        searchText: new FormControl(initValue || '', Validators.minLength(3)),
      });

      this.searchForm.updateValueAndValidity();
    });
  }

  private initSearchControlListener(): void {
    this.searchFormControls.searchText.valueChanges
      .pipe(
        filter((search: string) => search?.length > 2 || !search),
        distinctUntilChanged(),
        debounceTime(500),
        switchMap((search) =>
          !this.hasError
            ? this._store.dispatch(new GithubDataSearchSetText(search))
            : EMPTY
        ),
        switchMap((_) =>
          this._actions.pipe(ofActionCompleted(GithubDataSearchSetText))
        ),
        switchMap((_) => this._store.dispatch(new GithubListGetData())),
        untilDestroyed(this)
      )
      .subscribe();
  }
}
