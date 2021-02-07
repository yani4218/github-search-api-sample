import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { ContentComponent } from './content.component';

@NgModule({
    declarations: [ContentComponent],
    exports: [ContentComponent],
    imports: [
        CommonModule,
        MatTableModule
    ]
})
export class ContentModule { }
