import { createFeatureSelector, createSelector } from "@ngrx/store";
import { AppState } from './app.reducer';

const selectAppState = createFeatureSelector<AppState>('app')

export const selectLandingPage = createSelector(
    selectAppState,
    (appState) => appState.landingPage
)

export const selectUserEmail = createSelector(
    selectAppState,
    (appState) => appState.email
)

export const selectUserType = createSelector(
    selectAppState,
    (appState) => appState.userType
)

export const selectLoading = createSelector(
    selectAppState,
    (appState) => appState.loading
)

export const selectLoadingMessage = createSelector(
    selectAppState,
    (appState) => appState.loadingMessage
)

export const selectNewUserData = createSelector(
    selectAppState,
    (appState) => appState.newUserData
)