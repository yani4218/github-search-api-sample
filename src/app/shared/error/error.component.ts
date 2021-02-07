import { Component, Inject } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';

export interface DialogData {
    message: string;
}

@Component({
    selector: 'app-error',
    templateUrl: './error.component.html',
    styleUrls: ['./error.component.scss']
})
export class ErrorComponent {
    message: string;

    constructor(
        @Inject(MAT_DIALOG_DATA) public data: DialogData,
        public dialog: MatDialog
    ) {
        this.message = data.message;
    }

    close(): void {
        console.log('onClose');
        this.dialog.closeAll();
    }
}
