import { Action, createReducer, on } from '@ngrx/store';
import { EntityAdapter, createEntityAdapter, EntityState } from '@ngrx/entity';
import {
  checkConfigurations,
  checkConfigurationsFailure,
  createConfigurationSuccess,
  createConfiguration,
  createConfigurationFailure,
  getDefaultConfigSuccess,
  getDefaultConfig,
  getDefaultConfigFailure,
  loadConfiguration,
  loadConfigurationSuccess,
  loadConfigurationFailure,
} from '../actions/config.actions';

export const configFeatureKey = 'config';

export interface ConfigState extends EntityState<any> {
  loading: boolean;
  loaded: boolean;
  configuration: any;
  userId: string;
  userOrgUnits: Array<any>;
  userName: string;
  error: any;
  notification: any;
}
export const adapter: EntityAdapter<any> = createEntityAdapter<any>();

export const initialState: ConfigState = adapter.getInitialState({
  loading: false,
  loaded: false,
  configuration: null,
  userId: null,
  userOrgUnits: [],
  userName: null,
  error: null,
  notification: null,
});

export const configReducer = createReducer(
  initialState,
  on(checkConfigurations, (state) => {
    return { ...state, loading: true, loaded: false };
  }),

  on(checkConfigurationsFailure, (state, { error }) => {
    const message =
      error && error.message ? error.message : 'Failed to load configurations';
    return {
      ...state,
      loading: false,
      loaded: true,
      notification: {
        type: 'ERROR',
        message,
      },
      error,
    };
  }),
  on(createConfiguration, (state) => {
    return { ...state, loading: true, loaded: false };
  }),
  on(createConfigurationSuccess, (state, { data }) => {
    return {
      ...state,
      loaded: true,
      loading: false,
    };
  }),
  on(createConfigurationFailure, (state, { error }) => {
    const message =
      error && error.message ? error.message : 'Failed to load scorecards';
    return {
      ...state,
      loading: false,
      loaded: true,
      notification: {
        type: 'ERROR',
        message,
      },
      error,
    };
  }),
  on(getDefaultConfig, (state) => {
    return { ...state, loading: true, loaded: false };
  }),
  on(getDefaultConfigSuccess, (state, { data }) => {
    return {
      ...state,
      loaded: true,
      loading: false,
    };
  }),
  on(getDefaultConfigFailure, (state, { error }) => {
    const message =
      error && error.message ? error.message : 'Failed to load configuration';
    return {
      ...state,
      loading: false,
      loaded: true,
      notification: {
        type: 'ERROR',
        message,
      },
      error,
    };
  }),
  on(loadConfiguration, (state) => {
    return { ...state, loading: true, loaded: false };
  }),
  on(loadConfigurationSuccess, (state, { data }) => {
    const userName = data && data.userName ? data.userName : '';
    const userId = data && data.userId ? data.userId : '';
    const userOrgUnits = data && data.orgUnits ? data.orgUnits : [];
    const configuration = data && data.config ? data.config : null;
    const notification = { type: 'SUCCESS', message: 'Configurations loaded succcessfully'}
    return {
      ...state,
      loaded: true,
      loading: false,
      configuration,
      userId,
      userName,
      userOrgUnits,
      notification
    };
  }),
  on(loadConfigurationFailure, (state, { error }) => {
    const message =
      error && error.message ? error.message : 'Failed to load config';
    return {
      ...state,
      loading: false,
      loaded: true,
      notification: {
        type: 'ERROR',
        message,
      },
      error,
    };
  })
);
