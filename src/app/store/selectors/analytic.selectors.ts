import { createFeatureSelector, createSelector } from '@ngrx/store';
import { SectionType } from 'src/app/core/models/dashboard.model';
import {
  analyticFeatureKey,
  AnalyticState,
} from '../reducers/analytic.reducer';
import { getSectionOneConfiguration } from './config.selectors';
const getAnalyticState = createFeatureSelector<AnalyticState>(
  analyticFeatureKey
);
export const getLoadingSections = createSelector(
  getAnalyticState,
  (state) => state.sectionsLoading
);
export const getSectionOneLoadingStatus = createSelector(
  getAnalyticState,
  getLoadingSections,
  (state, loadingSections) => {
    if (loadingSections.includes(SectionType.SECTION_ONE)) {
      return true;
    }
    return false;
  }
);
export const getSectionTwoLoadingStatus = createSelector(
  getAnalyticState,
  getLoadingSections,
  (state, loadingSections) => {
    if (loadingSections.includes(SectionType.SECTION_TWO)) {
      return true;
    }
    return false;
  }
);
export const getSectionOneAnalyticsData = createSelector(
  getAnalyticState,
  (state) => {
    return state[SectionType.SECTION_ONE];
  }
);
export const getSectionTwoAnalyticsData = createSelector(
  getAnalyticState,
  (state) => {
    return state[SectionType.SECTION_TWO];
  }
);
export const getSectionThreeAnalyticsData = createSelector(
  getAnalyticState,
  (state) => {
    return state[SectionType.SECTION_THREE];
  }
);
export const getSectionFourAnalyticsData = createSelector(
  getAnalyticState,
  (state) => {
    return state[SectionType.SECTION_FOUR];
  }
);
