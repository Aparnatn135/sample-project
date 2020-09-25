import { createFeatureSelector, createSelector } from "@ngrx/store";
import { AdminRootState } from './../admin.root.redux';



const selectAdminRootState= createFeatureSelector<AdminRootState>('adminInfo')

export const selectAdminToolbarTitle = createSelector(
    selectAdminRootState,
    (studentRootState) => studentRootState.adminState.toolbarTitle
)