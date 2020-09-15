import { ActionReducerMap, MetaReducer } from '@ngrx/store';
import { environment } from 'src/environments/environment';
import { ConfigState, configReducer } from './config.reducer';

export interface State {
  configs: ConfigState;
}

export const reducers: ActionReducerMap<State> = {
  configs: configReducer,
};

export const metaReducers: MetaReducer<State>[] = !environment.production
  ? []
  : [];

export const getRootState = (state: State) => state;
