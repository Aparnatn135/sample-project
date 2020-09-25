import { Injectable } from "@angular/core";
import { DefaultDataService, HttpUrlGenerator, Logger } from '@ngrx/data';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, switchMap, take } from 'rxjs/operators';
import { Assignment } from './assignment.entityservice';
import { selectUserEmail } from 'src/app/redux/app.selectors';
import { AngularFirestore } from '@angular/fire/firestore';
import { Store } from '@ngrx/store';
import { AdminState } from './../admin.reducer';

@Injectable({ providedIn: 'root' })
export class AssignmentDataService extends DefaultDataService<Assignment> {

    constructor(http: HttpClient, httpUrlGenerator: HttpUrlGenerator, logger: Logger, private afs: AngularFirestore, private store: Store<AdminState>) {
        super('Assignment', http, httpUrlGenerator);
        logger.log('Created custom Hero EntityDataService');
    }

    getAll(): Observable<Assignment[]> {
        return this.store.select(selectUserEmail).pipe(
            switchMap(() => {
                return this.afs.collection('assignments').valueChanges()
            }),
            take(1),
            map((data) => data as Assignment[])
        )
    }
}