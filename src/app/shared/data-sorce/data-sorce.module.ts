import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { DataSourceService } from './data-sorce.service';

@NgModule({
    imports: [
        CommonModule,
        HttpClientModule
    ],
    providers: [DataSourceService]
})
export class DataSourceModule { }
