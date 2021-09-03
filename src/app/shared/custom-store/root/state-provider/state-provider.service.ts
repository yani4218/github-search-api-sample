import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

@Injectable()
export abstract class StateService<T> {
  constructor() {}

  // methods
  abstract update(stateKey: string, state: T): Observable<any>;
  abstract get(stateKey: string): Observable<T>;
}
