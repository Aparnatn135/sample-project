import { createReducer, on } from '@ngrx/store';
import { setAdminToolbarTitle } from './adminactions';



export interface AdminState {
    toolbarTitle: string;
}

export const initialAdminState: AdminState = {
    toolbarTitle: 'Aim Edu Online'
};

export const adminReducer = createReducer(
    initialAdminState,
    on(setAdminToolbarTitle, (state, action) => {
        return { ...state, toolbarTitle: action.title }
    })
)
