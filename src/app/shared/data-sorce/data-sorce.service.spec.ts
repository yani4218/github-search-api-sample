import { createHttpFactory, SpectatorHttp, HttpMethod } from '@ngneat/spectator';

import { DataSourceService } from './data-sorce.service';

describe('DataSorceService', () => {
    let spectator: SpectatorHttp<DataSourceService>;
    const createHttp = createHttpFactory(DataSourceService);

    beforeEach(() => spectator = createHttp());

    it('should create', () => {
        expect(spectator.service).toBeTruthy();
    });

    it('can test HttpClient.get', () => {
        spectator.service.getRepos('search').subscribe();
        spectator.expectOne('https://api.github.com/search/repositories?q=search&page=1&per_page=10', HttpMethod.GET);
    });
});
