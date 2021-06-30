import { createAction, props } from '@ngrx/store';
import { IGitHubRepo, IList } from '../entities/github-data.interface';

export const GITHUB_LIST_GET_DATA = '[Github List] Get Data';
export const GITHUB_LIST_GET_DATA_SUCCESS = '[Github List] Get Data success';
export const GITHUB_LIST_GET_DATA_FAILURE = '[Github List] Get Data failure';

export const githubListGetData = createAction(
  GITHUB_LIST_GET_DATA,
  props<{ search: string }>()
);

export const githubListGetDataSuccess = createAction(
  GITHUB_LIST_GET_DATA_SUCCESS,
  props<IList<IGitHubRepo>>()
);
export const githubListGetDataFailure = createAction(
  GITHUB_LIST_GET_DATA_FAILURE,
  props<any>()
);
