import { Spectator, createComponentFactory } from '@ngneat/spectator';
import {
  IGitHubRepo,
  IList,
} from '../github-data/entities/github-data.interface';

import { GithubReposListModule } from './github-repos-list.module';
import { GithubReposListComponent } from './github-repos-list.component';
import { of } from 'rxjs';
import { Store } from '@ngrx/store';

describe('GithubReposListComponent', () => {
  let spectator: Spectator<GithubReposListComponent>;

  class MockStore {
    select = jasmine.createSpy().and.returnValue(of(mockData));
    dispatch = jasmine.createSpy();
    pipe = jasmine.createSpy().and.returnValue(of('success'));
  }

  const mockData: IList<IGitHubRepo> = {
    incomplete_results: false,
    items: [{ id: 1, name: 'some name', stargazers_count: 1 }],
    total_count: 1,
  };

  const createComponent = createComponentFactory({
    component: GithubReposListComponent,
    imports: [GithubReposListModule],
    providers: [
      {
        provide: Store,
        useClass: MockStore,
      },
    ],
    declareComponent: false, // Defaults to true
  });

  beforeEach(() => {
    spectator = createComponent();
  });

  it('should create', () => {
    expect(spectator.component).toBeTruthy();
    expect(spectator.debugElement).toBeTruthy();
  });

  it('не отображаются данные.', () => {
    expect(spectator.query('[data-element="list"]')).toBeFalsy();
    expect(spectator.query('[data-element="empty-list"]')).toBeTruthy();
  });
});
