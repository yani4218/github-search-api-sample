import {
  createHttpFactory,
  SpectatorHttp,
  HttpMethod,
} from '@ngneat/spectator';

import { GithubDataService } from './github-data.service';

describe('DataSorceService', () => {
  let spectator: SpectatorHttp<GithubDataService>;
  const createHttp = createHttpFactory(GithubDataService);

  beforeEach(() => (spectator = createHttp()));

  it('should create', () => {
    expect(spectator.service).toBeTruthy();
  });

  it('can test HttpClient.get', () => {
    spectator.service
      .getRepos('search', { pageIndex: 1, pageSize: 10, length: 0 })
      .subscribe();
    spectator.expectOne(
      'https://api.github.com/search/repositories?q=search+in&page=1&per_page=10',
      HttpMethod.GET
    );
  });
});
