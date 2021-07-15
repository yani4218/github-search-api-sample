import { IGitHubRepo, IList } from '../entities/github-data.interface';

export class GithubListGetData {
  static readonly type = '[Github List] Get Data';
}

export class GithubListGetDataSuccess {
  static readonly type = '[Github List] Get Data success';

  constructor(public payload: IList<IGitHubRepo>) {}
}

export class GithubListGetDataFailure {
  static readonly type = '[Github List] Get Data failure';

  constructor(public payload: any) {}
}
