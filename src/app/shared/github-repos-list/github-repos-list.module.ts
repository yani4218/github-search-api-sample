import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';

import { GithubReposListComponent } from './github-repos-list.component';

@NgModule({
  declarations: [GithubReposListComponent],
  exports: [GithubReposListComponent],
  imports: [CommonModule, MatTableModule, MatPaginatorModule, MatSortModule],
})
export class GithubReposListModule {}
