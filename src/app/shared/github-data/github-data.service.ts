import { IPagination } from '../github-repos-list/entites/pagination.interface';
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IGitHubRepo, IList } from './entities';

@Injectable()
export class GithubDataService {
  private url = 'https://api.github.com/search/repositories';

  // tslint:disable-next-line:variable-name
  constructor(private _http: HttpClient) {}

  getRepos(
    search: string,
    pagination: IPagination = { pageIndex: 1, pageSize: 10 }
  ): Observable<IList<IGitHubRepo>> {
    const params = new HttpParams()
      .set('q', search)
      .set('page', `${pagination?.pageIndex}`)
      .set('per_page', `${pagination?.pageSize}`);
    return this._http.get<IList<IGitHubRepo>>(this.url, { params });
  }
}
