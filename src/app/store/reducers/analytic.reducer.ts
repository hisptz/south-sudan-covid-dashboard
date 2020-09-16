import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { Action, createReducer, on } from '@ngrx/store';
import { SectionType } from 'src/app/core/models/dashboard.model';
import {
  loadAnalyticsData,
  loadAnalyticsDataFailure,
  loadAnalyticsDataSuccess,
} from '../actions/analytic.actions';

export const analyticFeatureKey = 'analytics';

export interface AnalyticState extends EntityState<any> {
  loading: boolean;
  sectionsLoading: Array<any>;
  [SectionType.SECTION_ONE]: any;
  [SectionType.SECTION_TWO]: any;
  [SectionType.SECTION_THREE]: any;
  [SectionType.SECTION_FOUR]: any;
  notification: {
    type: string;
    message: string;
  };
}
export const adapter: EntityAdapter<any> = createEntityAdapter<any>();
export const initialState: AnalyticState = adapter.getInitialState({
  loading: false,
  sectionsLoading: [],
  [SectionType.SECTION_ONE]: null,
  [SectionType.SECTION_TWO]: null,
  [SectionType.SECTION_THREE]: null,
  [SectionType.SECTION_FOUR]: null,
  notification: null,
});

export const analyticReducer = createReducer(
  initialState,
  on(loadAnalyticsData, (state, { sectionType }) => {
    const sectionsLoading =
      state.sectionsLoading && state.sectionsLoading.includes(sectionType)
        ? [...state.sectionsLoading]
        : [...state.sectionsLoading, sectionType];
    return { ...state, sectionsLoading };
  }),
  on(loadAnalyticsDataSuccess, (state, { sectionType, data }) => {
    const sectionsLoading =
      state.sectionsLoading && state.sectionsLoading.includes(sectionType)
        ? [...state.sectionsLoading].filter((item) => item !== sectionType)
        : [...state.sectionsLoading];
    return { ...state, sectionsLoading, [sectionType]: data };
  }),
  on(loadAnalyticsDataFailure, (state, { error }) => {
    return {
      ...state,
      notification: {
        type: 'ERROR',
        message: 'Error while loading data',
      },
    };
  })
);
