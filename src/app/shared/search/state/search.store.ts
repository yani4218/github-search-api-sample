import { initialState } from './../../github-repos-list/state/github-repos-list.state';
import { Injectable, NgZone } from '@angular/core';

import { Observable, of, from } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { Actions, MamkaStore, StateService } from '../../custom-store/root';
import { SearchActions } from './search.actions';
import { SearchState } from './search.state';

export const defaultInitialState = '';

@Injectable()
export class SearchStore extends MamkaStore<SearchState, SearchActions> {
  private readonly _stateKey: string;

  constructor(private readonly _stateService: StateService<string>) {
    super(new SearchState());
    this._stateKey = 'search';

    this.initialState();
    this.initActionsListener();

    this.select().subscribe((v) => console.log(v));
  }

  // Selectors
  selectSearchText(): Observable<string> {
    return this.select().pipe(
      map((state) => {
        console.log(state);
        return state.search;
      })
    );
  }

  // Reducers
  SearchRootReducer(action: Actions<SearchActions>): Actions<SearchActions> {
    switch (action.type) {
      case SearchActions.setSearchText:
        console.log(action);
        this.updateState(action.payload);
        return action;
      default:
        this.nextState({ ...this.state });
        return action;
    }
  }

  // Private methods
  private updateState(payload: string): void {
    console.log(payload);
    this.nextState({
      search: payload,
    });
  }

  private initialState(): void {
    this._stateService
      .get(this._stateKey)
      .subscribe((state) =>
        this.updateState(state ? state : defaultInitialState)
      )
      .unsubscribe();
  }

  private initActionsListener(): void {
    this.actions$
      .pipe(
        switchMap((action) => of(this.SearchRootReducer(action))),
        switchMap((action) =>
          this._stateService.update(this._stateKey, action.payload)
        )
      )
      .subscribe();
  }
}
