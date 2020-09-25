import { createAction, props } from '@ngrx/store';

export const signupWithEmailPassword = createAction(
    '[Registration] Signup With Email Password',
    props<{ email: string, password: string }>()
);

export const loginWithEmailPassword = createAction(
    '[Login] Login With Email Password',
    props<{ email: string, password: string }>()
);

export const loginSuccess = createAction(
    '[Auth] Login Success',
    props<{ email: string }>()
);

export const loginFailure = createAction(
    '[Auth] Login Failure',
    props<{ reason: string }>()
);

export const logout = createAction(
    '[Auth] Logout'
);