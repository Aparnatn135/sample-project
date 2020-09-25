import { Injectable } from '@angular/core';

import { createEffect, ofType, Actions } from '@ngrx/effects';

import { logout } from '../registration/redux/registration.actions';

import { tap } from 'rxjs/operators';

import { AuthService } from '../common/database/services/auth.service';

@Injectable()
export class AuthEffects {

    logout$ = createEffect(() =>
        this.actions$.pipe(
            ofType(logout),
            tap(() => this.authService.signout())
        ), { dispatch: false }
    );

    constructor(private actions$: Actions, private authService: AuthService,

    ) { }



}