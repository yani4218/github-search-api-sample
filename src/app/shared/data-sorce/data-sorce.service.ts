import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { IGitHubRepo, IList } from './entities';

@Injectable()
export class DataSourceService {
    private url = 'https://api.github.com/search/repositories';

    // tslint:disable-next-line:variable-name
    constructor(private _http: HttpClient) { }

    getRepos(search: string): Observable<IGitHubRepo[]> {
        const params = new HttpParams()
            .set('q', search)
            .set('page', '1')
            .set('per_page', '10');
        return this._http.get<IList<IGitHubRepo>>(this.url, { params })
            .pipe(
                map(reposList => reposList.items));
    }
}
