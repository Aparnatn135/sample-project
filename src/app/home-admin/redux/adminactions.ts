import { createAction, props } from '@ngrx/store';

export const setAdminToolbarTitle = createAction(
    '[Toolbar] Set Admin Toolbar Title',
    props<{ title: string } >()
);

