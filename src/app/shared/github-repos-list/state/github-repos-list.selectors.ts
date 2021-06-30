import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AppState } from '../../store/app-store';

export const selectFeature = (state: AppState) => state.githubReposList;

export const getPaginator = createSelector(
  selectFeature,
  (state) => state.paginator
);

export const getSort = createSelector(selectFeature, (state) => state.sort);
