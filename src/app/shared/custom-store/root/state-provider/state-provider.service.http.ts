import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import { Observable } from 'rxjs';

import { API_STATE } from './state-api-path-token';

@Injectable()
export class StateServiceHttp<T> {
  constructor(
    @Inject(API_STATE) private readonly _url: string,
    private readonly _http: HttpClient
  ) {}

  // Http methods
  update(stateKey: string, state: T): Observable<T> {
    return this._http.post<T>(this._url + stateKey, {
      stateValue: JSON.stringify(state),
    });
  }

  get(stateKey: string): Observable<T> {
    return this._http.get<T>(this._url + stateKey);
  }
}
