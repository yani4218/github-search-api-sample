import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

import { EMPTY, Observable, of } from 'rxjs';
import {
  debounceTime,
  distinctUntilChanged,
  filter,
  first,
  switchMap,
} from 'rxjs/operators';

import { Store } from '@ngxs/store';

import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

import { GithubListGetData } from '../github-data/state';
import { SearchStore } from './state/search.store';
import { SearchActions } from './state';

@UntilDestroy()
@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [SearchStore],
})
export class SearchComponent implements OnInit {
  search$: Observable<string> = this._searchStore.selectSearchText();

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
    private readonly _searchStore: SearchStore
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
        switchMap((search) => {
          this._searchStore.dispatch({
            type: SearchActions.setSearchText,
            payload: search,
          });

          return of(search);
        }),
        switchMap((_) => this._store.dispatch(new GithubListGetData())),
        untilDestroyed(this)
      )
      .subscribe();
  }
}
