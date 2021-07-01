import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

import {
  debounceTime,
  distinctUntilChanged,
  filter,
  first,
} from 'rxjs/operators';

import { Store } from '@ngrx/store';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

import { AppState } from '../store/app-store';
import { getGitHubDataSearch, githubDataSearchSetText } from './state';

@UntilDestroy()
@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchComponent implements OnInit {
  private readonly search$ = this._store.select(getGitHubDataSearch);

  errorMessage = '';

  searchForm: FormGroup;

  get searchFormControls(): { [key: string]: AbstractControl } {
    return this.searchForm && this.searchForm.controls;
  }

  get hasError(): boolean {
    return this.searchFormControls.searchText.invalid;
  }

  constructor(private _store: Store<AppState>) {}

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
        untilDestroyed(this)
      )
      .subscribe((search) =>
        !this.hasError
          ? this._store.dispatch(githubDataSearchSetText({ search }))
          : () => {}
      );
  }
}
