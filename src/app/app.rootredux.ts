import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer
} from '@ngrx/store';
import { environment } from '../environments/environment';
import { AppState, appReducer } from './redux/app.reducer';

export interface RootState {

  app: AppState

}

export const reducers: ActionReducerMap<RootState> = {
  app: appReducer
};


export const metaReducers: MetaReducer<RootState>[] = !environment.production ? [] : [];
