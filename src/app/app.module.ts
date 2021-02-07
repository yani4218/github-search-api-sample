import { ErrorHandler, NgModule } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { TitleModule } from './shared/title';
import { SearchModule } from './shared/search/search.module';
import { ContentModule } from './shared/content';
import { DataSourceModule } from './shared/data-sorce';

import { AppComponent } from './app.component';
import { ErrorModule } from './shared/error/error.module';

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        TitleModule,
        SearchModule,
        ContentModule,
        DataSourceModule,
        MatDialogModule,
        ErrorModule
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
