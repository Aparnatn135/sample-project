import { createReducer, on } from '@ngrx/store';
import { setLandingPage, setUserType, setUserEmail, showLoader, hideLoader, saveNewUserData, removeNewUserData } from './app.actions';


export interface AppState {
    landingPage: string;
    userType: string;
    email: string;
    loading:boolean;
    loadingMessage:string;
    newUserData:any;
}

export const initialAppState: AppState = {
    landingPage: 'registration',
    userType: null,
    email: null,
    loading:false,
    loadingMessage:'',
    newUserData:null
    
};

export const appReducer = createReducer(
    initialAppState,
    on(saveNewUserData, (state, action) => {
        return {
            ...state, newUserData :{...action.data}
        }
    }),
    on(removeNewUserData, (state, action) => {
        return {
            ...state, newUserData :null
        }
    }),

    on(setLandingPage, (state, action) => {
        return {
            ...state, landingPage: action.landingPage
        }
    }),

    on(showLoader, (state, action) => {
        return {
            ...state, loadingMessage: action.loadingMessage , loading:true
        }
    }),

    on(hideLoader, (state, action) => {
        return {
            ...state, loadingMessage: '' , loading:false
        }
    }),

    on(setUserType, (state, action) => {

        return {
            ...state, userType: action.userType
        }
    }),

    on(setUserEmail, (state, action) => {

        return {
            ...state, email: action.email
        }
    }),



);