import { Injectable, Inject } from '@angular/core';
import { createEffect, ofType, Actions } from '@ngrx/effects';
import { tap, switchMap, filter, withLatestFrom, map } from 'rxjs/operators'
import { signInWithEmailLink, setUserEmail, setUserType, newUserLoggedIn, existingUserLoggedIn, removeNewUserData } from './app.actions';
import { navigateTo } from '../common/router/redux/router.actions';
import { RootState } from '../app.rootredux';
import { Store } from '@ngrx/store';
import { AuthService } from '../common/database/services/auth.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { IUser } from './../common/database/services/auth.service';
import { LOCAL_STORAGE, StorageService } from 'ngx-webstorage-service';
import { loginSuccess } from '../registration/redux/registration.actions';
import { selectUserEmail, selectNewUserData } from './app.selectors';
import { hideLoader } from 'src/app/redux/app.actions';

export const STORAGE_KEY = 'userType';

@Injectable()
export class AppEffects {

    isNewUserLoggedIn$ = createEffect(() =>
        this.actions$.pipe(
            ofType(newUserLoggedIn),
            withLatestFrom(this.store.select(selectUserEmail),this.store.select(selectNewUserData)),
            switchMap(([action,email,newUserData]) => {
                let userDoc = this.afs.collection<IUser>('users').doc(email);
                userDoc.set({ ...newUserData });
                const landingPage = `home-${newUserData.userType }/newuser`;
                return [hideLoader() ,removeNewUserData(),setUserType({ userType : newUserData.userType }) , loginSuccess({ email }), navigateTo({ path: landingPage })];
            })
        )
    );

    isUserAlreadyLoggedIn$ = createEffect(
        () => this.authService.userLoginStatusSubject$.pipe(
            filter((user) => user),
            tap((user: any) => this.store.dispatch(setUserEmail({ email: user?.email }))),
            switchMap(user => this.afs.collection<IUser>('users').doc((user as any).email).get()),
            withLatestFrom(this.store.select(selectUserEmail)),
            switchMap(([userDocument, email]) => {

                let userType
                
                let landingPage;
                let userDetails = userDocument.data();
                if (userDetails?.userType) {
                    userType = userDetails.userType;
                    landingPage = `home-${userType}/dashboard`;
                    return [hideLoader() ,existingUserLoggedIn(),setUserType({ userType }) , loginSuccess({ email }), navigateTo({ path: landingPage })]
                } else {
                    
                    return [newUserLoggedIn()]
                }

            }),
        ), { dispatch: true });

    isUserLoggedOut$ = createEffect(
        () => this.authService.userLoginStatusSubject$.pipe(
            filter((user) => !user),
            switchMap(() => [navigateTo({ path: 'registration' })]),
        ));


    signInWithEmailLink$ = createEffect(() =>
        this.actions$.pipe(
            ofType(signInWithEmailLink),
            tap(() =>
                this.authService.signInWithEmailLink()
            )
        ), { dispatch: false }
    );

    constructor(private actions$: Actions, private authService: AuthService,
        private store: Store<RootState>,
        private afs: AngularFirestore) { }

}