import { PageEvent } from '@angular/material/paginator';
import { Sort } from '@angular/material/sort';
import { createAction, props } from '@ngrx/store';

export const GITHUB_LIST_SET_PAGINATION = '[Github List] Set Pagination';
export const GITHUB_LIST_SET_SORTING = '[Github List] Set Sorting';

export const githubListSetPagination = createAction(
  GITHUB_LIST_SET_PAGINATION,
  props<PageEvent>()
);

export const githubListSetSotring = createAction(
  GITHUB_LIST_SET_SORTING,
  props<Sort>()
);
