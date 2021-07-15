import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { GithubDataSearchSetText } from './search.actions';

@State<string>({
  name: 'search',
  defaults: '',
})
@Injectable()
export class GithubSearchState {
  @Selector()
  static getGitHubDataSearch(state: string): string {
    return state;
  }

  @Action(GithubDataSearchSetText)
  githubDataSearchSetText(
    ctx: StateContext<string>,
    action: GithubDataSearchSetText
  ): void {
    ctx.setState(action.payload);
  }
}
