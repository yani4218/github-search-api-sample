import { Spectator, createComponentFactory } from '@ngneat/spectator';
import { TestBed } from '@angular/core/testing';
import { HttpErrorResponse } from '@angular/common/http';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';

import { of, throwError } from 'rxjs';

import { GithubReposListComponent } from './shared/github-repos-list';
import { GithubDataService, IGitHubRepo, IList } from './shared/github-data';
import { SearchComponent } from './shared/search';
import { TitleComponent } from './shared/title';

import { AppModule } from './app.module';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
  let spectator: Spectator<AppComponent>;
  let service: GithubDataService;
  let dialog: MatDialog;

  const mockData: IList<IGitHubRepo> = {
    incomplete_results: false,
    items: [{ id: 1, name: 'some name', stargazers_count: 1 }],
    total_count: 1,
  };

  const createComponent = createComponentFactory({
    component: AppComponent,
    imports: [AppModule],
    providers: [
      { provide: MAT_DIALOG_DATA, useValue: {} },
      { provide: MatDialogRef, useValue: {} },
    ],
    declareComponent: false, // Defaults to true
  });

  beforeEach(() => {
    service = TestBed.inject(GithubDataService);
    spyOn(service, 'getRepos').and.returnValue(of(mockData));

    dialog = TestBed.inject(MatDialog);
    spyOn(dialog, 'open');

    spectator = createComponent();
  });

  it('should create', () => {
    expect(spectator.component).toBeTruthy();
    expect(spectator.debugElement).toBeTruthy();
  });

  it('содержит title компонент.', () => {
    expect(spectator.query(TitleComponent)).toBeTruthy();
  });

  it('содержит search компонент.', () => {
    expect(spectator.query(SearchComponent)).toBeTruthy();
  });

  describe('компонент с контентом', () => {
    it('содержит контент компонент.', () => {
      expect(spectator.query(GithubReposListComponent)).toBeTruthy();
    });

    it('поле поиска пустое запрос не отправляется', () => {
      spectator.component.onSearch('');

      expect(service.getRepos).not.toHaveBeenCalled();
    });

    it('инпут контент компонента.', () => {
      spectator.component.onSearch('test');
      spectator.detectChanges();

      expect(spectator.query(GithubReposListComponent)?.repos).toEqual(
        mockData
      );
    });

    it('открывается диалог с ошибкой.', () => {
      service.getRepos = jasmine.createSpy().and.returnValue(
        throwError(
          new HttpErrorResponse({
            status: 404,
            error: { message: 'test error' },
          })
        )
      );

      spectator.component.onSearch('test');

      expect(service.getRepos).toHaveBeenCalledWith('test', {
        pageIndex: 1,
        pageSize: 10,
      });
      expect(dialog.open).toHaveBeenCalled();
    });
  });
});
