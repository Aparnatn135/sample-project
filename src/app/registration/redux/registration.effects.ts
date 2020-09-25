import { Injectable } from '@angular/core';
import { createEffect, ofType , Actions } from '@ngrx/effects';
import { from  } from 'rxjs';
import {switchMap  , concatMap, catchError, tap} from 'rxjs/operators'
import { Router } from '@angular/router';

import { signupWithEmailPassword, loginWithEmailPassword, loginFailure, logout } from './registration.actions';
import { AuthService } from 'src/app/common/database/services/auth.service';



@Injectable()
export class RegistrationEffects {

     loginWithEmailPassword$ = createEffect(() =>
       this.actions$.pipe(
           ofType(loginWithEmailPassword),
          concatMap((action) =>
              from(this.authService.login(action.email, action.password)).pipe(
                  switchMap(data =>
                      []
                  ),
                  catchError(error => [loginFailure({ reason: error.code })])
                  )
             )
         ), { dispatch: true }
     );

  

     signup$ = createEffect(() =>
         this.actions$.pipe(
             ofType(signupWithEmailPassword),
             concatMap((action) =>
                 from(this.authService.signup(action.email, action.password)).pipe(
                    switchMap(data =>
                        []
                    ),
                    catchError(error => [loginFailure({ reason: error.code })])
                )
            )
        ), { dispatch: true }
    );

    constructor(private actions$: Actions, private authService: AuthService, private router: Router) { }

}