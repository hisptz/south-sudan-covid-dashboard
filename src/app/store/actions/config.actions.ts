import { createAction, props } from '@ngrx/store';

export const checkConfigurations = createAction(
  '[Config] Check Configurations'
);
export const checkConfigurationsFailure = createAction(
  '[Config] Check Configurations',
  props<{ error: any }>()
);

export const createConfiguration = createAction(
  '[Config] Create Configuration',
  props<{ data: any }>()
);
export const createConfigurationSuccess = createAction(
  '[Config] Create Configuration Success',
  props<{ data: any }>()
);
export const createConfigurationFailure = createAction(
  '[Config] Create Configuration Failure',
  props<{ error: any }>()
);

