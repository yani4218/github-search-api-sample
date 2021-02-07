import { TestBed } from '@angular/core/testing';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { createComponentFactory, Spectator } from '@ngneat/spectator';

import { ErrorComponent } from './error.component';
import { ErrorModule } from './error.module';

describe('ErrorDialogComponent', () => {
    let spectator: Spectator<ErrorComponent>;

    const createComponent = createComponentFactory({
        component: ErrorComponent,
        imports: [ErrorModule],
        providers: [
            { provide: MAT_DIALOG_DATA, useValue: { message: 'test error message' } },
            { provide: MatDialogRef, useValue: {} }
        ],
        declareComponent: false, // Defaults to true
    });

    beforeEach(() => spectator = createComponent());

    it('should create', () => {
        expect(spectator.component).toBeTruthy();
        expect(spectator.debugElement).toBeTruthy();
    });

    it('отображается сообщение об ошибке в диалоге', () => {
        expect(spectator.query('h1')).toHaveText('test error message');
    });
});
