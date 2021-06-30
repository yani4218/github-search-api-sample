import { ErrorHandler, NgModule } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { TitleModule } from './shared/title';
import { SearchModule } from './shared/search/search.module';
import { GithubReposListModule } from './shared/github-repos-list';
import { GithubDataModule } from './shared/github-data';

import { AppComponent } from './app.component';
import { ErrorModule } from './shared/error/error.module';
import { AppStoreModule } from './shared/store';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppStoreModule,
    TitleModule,
    SearchModule,
    GithubReposListModule,
    GithubDataModule,
    MatDialogModule,
    ErrorModule,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
