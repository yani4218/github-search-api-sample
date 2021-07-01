// import { Spectator, createComponentFactory } from '@ngneat/spectator';
// import { TestBed } from '@angular/core/testing';
// import { HttpErrorResponse } from '@angular/common/http';
// import {
//   MatDialog,
//   MatDialogRef,
//   MAT_DIALOG_DATA,
// } from '@angular/material/dialog';

// import { of, throwError } from 'rxjs';

// import { GithubReposListComponent } from './shared/github-repos-list';
// import { GithubDataService, IGitHubRepo, IList } from './shared/github-data';
// import { SearchComponent } from './shared/search';
// import { TitleComponent } from './shared/title';

// import { AppModule } from './app.module';
// import { AppComponent } from './app.component';
// import { Store } from '@ngrx/store';

// describe('AppComponent', () => {
//   let spectator: Spectator<AppComponent>;
//   class MockStore {
//     select = jasmine.createSpy().and.returnValue(of());
//     dispatch = jasmine.createSpy();
//     pipe = jasmine.createSpy().and.returnValue(of('success'));
//   }

//   const createComponent = createComponentFactory({
//     component: AppComponent,
//     imports: [AppModule],
//     providers: [
//       //   { provide: MAT_DIALOG_DATA, useValue: {} },
//       //   { provide: MatDialogRef, useValue: {} },s
//       {
//         provide: Store,
//         useClass: MockStore,
//       },
//     ],
//     declareComponent: false, // Defaults to true
//   });

//   beforeEach(() => {
//     // dialog = TestBed.inject(MatDialog);
//     // spyOn(dialog, 'open');

//     spectator = createComponent();
//   });

//   it('should create', () => {
//     expect(spectator.component).toBeTruthy();
//     expect(spectator.debugElement).toBeTruthy();
//   });

//   it('содержит title компонент.', () => {
//     expect(spectator.query(TitleComponent)).toBeTruthy();
//   });

//   it('содержит search компонент.', () => {
//     expect(spectator.query(SearchComponent)).toBeTruthy();
//   });

//   it('содержит контент компонент.', () => {
//     expect(spectator.query(GithubReposListComponent)).toBeTruthy();
//   });
// });
