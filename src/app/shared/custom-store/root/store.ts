import { Observable, BehaviorSubject, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { Actions } from './actions';

/** Base Store class.
 *
 * @param T -> Store type.
 * @param S -> Actions type.
 */
export class MamkaStore<T, S> {
  private readonly _destroy$: Subject<undefined>;
  private readonly _state$: BehaviorSubject<T>;
  private readonly _stateStream$: Observable<T>;
  private readonly _actionStream$: Observable<Actions<S>>;

  // Actions
  actions$: Subject<Actions<S>>;

  // Get last value synchronously from state.
  get state(): T {
    return this._state$.getValue();
  }

  protected constructor(initialState: T) {
    this._destroy$ = new Subject();

    this._state$ = new BehaviorSubject(initialState);
    this.actions$ = new Subject<Actions<S>>();

    // Initial data streams.
    this._stateStream$ = this._state$
      .asObservable()
      .pipe(takeUntil(this._destroy$));
    this._actionStream$ = this.actions$
      .asObservable()
      .pipe(takeUntil(this._destroy$));

    this._stateStream$.subscribe((v) => console.log(v));
  }

  // get value stream from state.
  select(): Observable<T> {
    return this._stateStream$;
  }

  // Effects for asynchronous operations.
  effects(): Observable<Actions<S>> {
    return this._actionStream$;
  }

  // Dispatch action at the Store.
  dispatch(action: Actions<S>): void {
    this.actions$.next(action);
  }

  // set next state value at the Store;
  nextState(nextState: T): void {
    this._state$.next(nextState);
  }

  // unsubscribe store;
  complete(): void {
    this._state$.complete();
    this.actions$.complete();

    this._destroy$.next();
    this._destroy$.complete();
  }
}
