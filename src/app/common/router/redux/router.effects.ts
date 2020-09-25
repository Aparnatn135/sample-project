import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { navigateTo } from './router.actions';
import { RouterService } from './services/router.service';
import { tap } from 'rxjs/operators';


@Injectable({
    providedIn: 'root'
})
export class RouterEffects {
    navigateTo$ = createEffect(
        () => this.actions$.pipe(
            ofType(navigateTo),
            tap((action) => this.routerService.navigateTo(action))
        ), { dispatch: false }
    )

    constructor(private actions$: Actions, private routerService: RouterService) {

    }
}