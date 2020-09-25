import {
    ActionReducer,
    ActionReducerMap,
    createFeatureSelector,
    createSelector,
    MetaReducer
  } from '@ngrx/store';
  import { environment } from '../../environments/environment';
import { AdminState, adminReducer } from './redux/admin.reducer';

  export interface AdminRootState {
  
    adminState: AdminState
  
  }
  
  export const reducers: ActionReducerMap<AdminRootState> = {
    adminState: adminReducer
  };
  
  
  export const metaReducers: MetaReducer<AdminRootState>[] = !environment.production ? [] : [];
  