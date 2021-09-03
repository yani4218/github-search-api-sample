import { Injectable, Inject } from '@angular/core';

import { Observable, of } from 'rxjs';

import { STORAGE_STATE } from './state-storage-path-token';

@Injectable()
export class StateServiceStorage<T> {
  constructor(
    @Inject(STORAGE_STATE) private readonly _isSessionStorage: boolean
  ) {}

  // methods
  update(stateKey: string, state: T): Observable<boolean> {
    this._isSessionStorage
      ? sessionStorage.setItem(stateKey, JSON.stringify(state))
      : localStorage.setItem(stateKey, JSON.stringify(state));

    return of(true);
  }

  get(stateKey: string): Observable<T> {
    if (this._isSessionStorage) {
      return of(JSON.parse(sessionStorage.getItem(stateKey) || ''));
    } else {
      return of(JSON.parse(localStorage.getItem(stateKey) || ''));
    }
  }
}
