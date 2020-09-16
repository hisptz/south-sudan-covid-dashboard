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

export const getDefaultConfig = createAction(
  '[Config] Get Default Config',
);

export const getDefaultConfigSuccess = createAction(
  '[Config] Get Default Config Success',
  props<{ data: any }>()
);

export const getDefaultConfigFailure = createAction(
  '[Config] Get Default Config Failure',
  props<{ error: any }>()
);
export const loadConfiguration = createAction(
  '[Config] Load Configuration',
);
export const loadConfigurationSuccess = createAction(
  '[Config] Load Configuration Success',
  props<{ data: any }>()
);
export const loadConfigurationFailure = createAction(
  '[Config] Load Configuration Failure',
  props<{ error: any }>()
);
export const updateConfigurationWithDefaultData = createAction(
  '[Config] Update Configuration With Default Data',
  props<{ configuration: any }>()
);
export const updateConfigurationWithDefaultDataSuccess = createAction(
  '[Config] Update Configuration With Default Data Success',
  props<{ data: any }>()
);
export const updateConfigurationWithDefaultDataFailure = createAction(
  '[Config] Update Configuration With Default Data Failure',
  props<{ error: any }>()
);