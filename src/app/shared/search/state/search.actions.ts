export class GithubDataSearchSetText {
  static readonly type = '[Github Search] Set text';

  constructor(public payload: string) {}
}
