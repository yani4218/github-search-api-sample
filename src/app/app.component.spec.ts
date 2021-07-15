import { Spectator, createComponentFactory } from '@ngneat/spectator';

import { GithubReposListComponent } from './shared/github-repos-list';
import { SearchComponent } from './shared/search';
import { TitleComponent } from './shared/title';

import { AppModule } from './app.module';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
  let spectator: Spectator<AppComponent>;

  const createComponent = createComponentFactory({
    component: AppComponent,
    imports: [AppModule],
    declareComponent: false, // Defaults to true
  });

  beforeEach(() => {
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

  it('содержит контент компонент.', () => {
    expect(spectator.query(GithubReposListComponent)).toBeTruthy();
  });
});
