import { createAction, props } from '@ngrx/store';

export const signInWithEmailLink = createAction(
    '[App] Sign In With Email Link'
);

export const setLandingPage = createAction(
    '[App] Set Landing Page',
    props<{ landingPage: string }>()
);

export const showLoader = createAction(
    '[App] Show Loader',
    props<{ loadingMessage: string }>()
);

export const hideLoader = createAction(
    '[App] Hide Loader'
);

export const setUserType = createAction(
    '[App] Set User Type',
    props<{ userType: string }>()
);

export const setUserEmail = createAction(
    '[App] Set User Email',
    props<{ email: string}>()
);

export const saveNewUserData = createAction(
    '[New Registration] Save New User Data',
    props<{ data:any }>()
);

export const removeNewUserData = createAction(
    '[New Registration] Remove New User Data'
);

export const newUserLoggedIn = createAction(
    '[Logged In] New User'
);

export const existingUserLoggedIn = createAction(
    '[Logged In] Existing User'
);

