import { MonoTypeOperatorFunction } from 'rxjs';
import { filter } from 'rxjs/operators';

import { Actions } from '../actions';

export function ofType<T extends Actions<S>, S>(
  _type: S
): MonoTypeOperatorFunction<T> {
  return filter((action) => _type === action.type);
}

export function skipType<T extends Actions<S>, S>(
  _type: S
): MonoTypeOperatorFunction<T> {
  return filter((action) => action && _type !== action.type);
}
