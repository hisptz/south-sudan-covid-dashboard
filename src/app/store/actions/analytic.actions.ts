import { createAction, props } from '@ngrx/store';
import { SectionType } from 'src/app/core/models/dashboard.model';

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
  props<{ error: any }>()
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
