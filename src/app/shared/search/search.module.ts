import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { SearchComponent } from './search.component';

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        MatInputModule
    ],
    declarations: [SearchComponent],
    exports: [SearchComponent]
})
export class SearchModule { }
