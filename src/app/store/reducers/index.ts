import { ActionReducerMap, MetaReducer } from '@ngrx/store';
import { environment } from 'src/environments/environment';
import { ConfigState, configReducer } from './config.reducer';

export interface State {
  config: ConfigState;
}

export const reducers: ActionReducerMap<State> = {
  config: configReducer
};

export const metaReducers: MetaReducer<State>[] = !environment.production
  ? []
  : [];

export const getRootState = (state: State) => state;
