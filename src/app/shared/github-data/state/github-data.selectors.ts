import { createSelector } from '@ngrx/store';
import { AppState } from '../../store/app-store';

export const selectFeature = (state: AppState) => state.githubData;

export const getGitHubDataList = createSelector(
  selectFeature,
  (state) => state.githubReposList.items
);

export const getGitHubDataListTotal = createSelector(
  selectFeature,
  (state) => state.githubReposList.total_count
);
