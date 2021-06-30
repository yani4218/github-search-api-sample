import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { GithubDataService } from './github-data.service';

@NgModule({
    imports: [
        CommonModule,
        HttpClientModule
    ],
    providers: [GithubDataService]
})
export class GithubDataModule { }
