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
export const getSectionThreeLoadingStatus = createSelector(
  getAnalyticState,
  getLoadingSections,
  (state, loadingSections) => {
    if (loadingSections.includes(SectionType.SECTION_THREE)) {
      return true;
    }
    return false;
  }
);
export const getSectionFourLoadingStatus = createSelector(
  getAnalyticState,
  getLoadingSections,
  (state, loadingSections) => {
    if (loadingSections.includes(SectionType.SECTION_FOUR)) {
      return true;
    }
    return false;
  }
);
export const getSectionFiveLoadingStatus = createSelector(
  getAnalyticState,
  getLoadingSections,
  (state, loadingSections) => {
    if (loadingSections.includes(SectionType.SECTION_FIVE)) {
      return true;
    }
    return false;
  }
);
export const getSectionSixLoadingStatus = createSelector(
  getAnalyticState,
  getLoadingSections,
  (state, loadingSections) => {
    if (loadingSections.includes(SectionType.SECTION_SIX)) {
      return true;
    }
    return false;
  }
);
export const getSectionSevenLoadingStatus = createSelector(
  getAnalyticState,
  getLoadingSections,
  (state, loadingSections) => {
    if (loadingSections.includes(SectionType.SECTION_SEVEN)) {
      return true;
    }
    return false;
  }
);
export const getSectionEightLoadingStatus = createSelector(
  getAnalyticState,
  getLoadingSections,
  (state, loadingSections) => {
    if (loadingSections.includes(SectionType.SECTION_EIGHT)) {
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
export const getSectionFiveAnalyticsData = createSelector(
  getAnalyticState,
  (state) => {
    return state[SectionType.SECTION_FIVE];
  }
);
export const getSectionSixAnalyticsData = createSelector(
  getAnalyticState,
  (state) => {
    return state[SectionType.SECTION_SIX];
  }
);
export const getSectionSevenAnalyticsData = createSelector(
  getAnalyticState,
  (state) => {
    return state[SectionType.SECTION_SEVEN];
  }
);
export const getSectionEightAnalyticsData = createSelector(
  getAnalyticState,
  (state) => {
    return state[SectionType.SECTION_EIGHT];
  }
);
export const getAllSectionAnalytics = createSelector(
  getAnalyticState,
  getSectionOneAnalyticsData,
  getSectionTwoAnalyticsData,
  getSectionThreeAnalyticsData,
  getSectionFourAnalyticsData,
  getSectionFiveAnalyticsData,
  getSectionSixAnalyticsData,
  (state, section1, section2, section3, section4, section5, section6) => {
    return {
      ...[],
      section1,
      section2,
      section3,
      section4,
      section5,
      section6,
    };
  }
);
