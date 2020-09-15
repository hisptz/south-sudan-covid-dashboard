import { createFeatureSelector, createSelector } from '@ngrx/store';
import { configFeatureKey, ConfigState } from '../reducers/config.reducer';

const getConfigState = createFeatureSelector<ConfigState>(configFeatureKey);
export const getConfiguration = createSelector(
  getConfigState,
  (state) => state.configuration || null
);
