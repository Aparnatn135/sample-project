import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
    providedIn: 'root'
})
export class RouterService {
    constructor(private router: Router) {

    }
    navigateTo(pathObject) {
        console.log(pathObject)
        this.router.navigate([pathObject.path])
    }
}
