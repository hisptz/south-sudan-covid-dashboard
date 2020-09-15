import { createAction, props } from '@ngrx/store';
import { SectionType } from 'src/app/core/models/dashboard.model';

export const loadAnalyticsData = createAction(
  '[Analytic] Load Analytics',
  props<{ sectionType: SectionType, periods: any[] }>()
);

export const loadAnalyticsDataSuccess = createAction(
  '[Analytic] Load Analytics Success',
  props<{ data: any }>()
);

export const loadAnalyticsDataFailure = createAction(
  '[Analytic] Load Analytics Failure',
  props<{ error: any }>()
);
