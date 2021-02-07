import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { ErrorComponent } from './error.component';

@NgModule({
    declarations: [ErrorComponent],
    exports: [ErrorComponent],
    imports: [
        CommonModule,
        MatButtonModule,
        MatDialogModule
    ]
})
export class ErrorModule { }
