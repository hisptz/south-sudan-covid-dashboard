import { ActionReducerMap, MetaReducer } from '@ngrx/store';
import { environment } from 'src/environments/environment';
import { analyticReducer, AnalyticState } from './analytic.reducer';
import { ConfigState, configReducer } from './config.reducer';

export interface State {
  configs: ConfigState;
  analytics: AnalyticState;
}

export const reducers: ActionReducerMap<State> = {
  configs: configReducer,
  analytics: analyticReducer,
};

export const metaReducers: MetaReducer<State>[] = !environment.production
  ? []
  : [];

export const getRootState = (state: State) => state;
