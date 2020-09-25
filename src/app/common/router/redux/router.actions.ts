import { createAction, props } from '@ngrx/store';
export const navigateTo = createAction(
    "[Router] Initiate Navigation",
    props<{ path: string }>()
)