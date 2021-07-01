import { createSelector } from '@ngrx/store';
import { AppState } from '../../store/app-store';

export const selectFeature = (state: AppState) => state.githubSearch;

export const getGitHubDataSearch = createSelector(
  selectFeature,
  (state) => state.search
);
