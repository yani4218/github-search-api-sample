import { Component, ChangeDetectionStrategy, Input } from '@angular/core';

import { PageEvent } from '@angular/material/paginator';
import { Sort } from '@angular/material/sort';

import {
  IGitHubRepo,
  IList,
} from '../github-data/entities/github-data.interface';

@Component({
  selector: 'app-github-repos-list',
  templateUrl: './github-repos-list.component.html',
  styleUrls: ['./github-repos-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GithubReposListComponent {
  @Input() repos: IList<IGitHubRepo>;

  displayedColumns = ['name', 'stargazers_count'];
  currentPage = 1;
  pageSize = 10;
  pageSizeOptions = [5, 10, 20];

  constructor() {}

  getPage(page: PageEvent): void {
    console.log(page);
  }

  onSortChange(sort: Sort): void {
    console.log(sort);
  }
}
