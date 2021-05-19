import { createAction, props } from '@ngrx/store';
import { SectionType } from 'src/app/core/models/dashboard.model';

export const prepareToLoadAnalyticsData = createAction(
  '[Analytic] Prepare To Load Analytics Data',
  props<{ sectionType: SectionType, periods: any[] }>()
);
export const configurationNotLoaded = createAction(
  '[Analytic] Configuration Not Loaded',
)

export const loadAnalyticsData = createAction(
  '[Analytic] Load Analytics',
  props<{ sectionType: SectionType, periods: any[] }>()
);

export const loadAnalyticsDataSuccess = createAction(
  '[Analytic] Load Analytics Success',
  props<{ sectionType: SectionType, data: any }>()
);

export const loadAnalyticsDataFailure = createAction(
  '[Analytic] Load Analytics Failure',
  props<{ error: any, sectionType?: SectionType }>()
);

export const loadMapAnalyticsData = createAction(
  '[Analytic] Load Map Analytics',
  props<{ sectionType: SectionType, periods: any[] }>()
);

export const loadMapAnalyticsDataSuccess = createAction(
  '[Analytic] Load Map Analytics Success',
  props<{ sectionType: SectionType, data: any }>()
);

export const loadMapAnalyticsDataFailure = createAction(
  '[Analytic] Load Map Analytics Failure',
  props<{ error: any }>()
);
export const loadLabAnalyticsData = createAction(
  '[Analytic] Load Lab Analytics',
  props<{ sectionType: SectionType, periods: any[] }>()
);
export const loadTypeOfTestsAnalyticsData = createAction(
  '[Analytic] Load Type of Tests Analytics',
  props<{ sectionType: SectionType, periods: any[] }>()
);
export const loadLabAnalyticsDataSuccess = createAction(
  '[Analytic] Load Lab Analytics Success',
  props<{ sectionType: SectionType, data: any }>()
);

export const loadLabAnalyticsDataFailure = createAction(
  '[Analytic] Load Lab Analytics Failure',
  props<{ error: any }>()
);
