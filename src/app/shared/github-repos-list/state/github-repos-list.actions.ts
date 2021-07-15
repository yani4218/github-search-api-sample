import { PageEvent } from '@angular/material/paginator';
import { Sort } from '@angular/material/sort';

export class GithubListSetPagination {
  static readonly type = '[Github List] Set Pagination';
  constructor(public payload: PageEvent) {}
}

export class GithubListSetSotring {
  static readonly type = '[Github List] Set Sorting';

  constructor(public payload: Sort) {}
}
