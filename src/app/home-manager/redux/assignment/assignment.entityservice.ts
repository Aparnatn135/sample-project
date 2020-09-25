import { Injectable } from "@angular/core";
import { EntityCollectionServiceBase, EntityCollectionServiceElementsFactory } from '@ngrx/data';

export interface Assignment{
   id:string;
}

@Injectable({providedIn:'root'})
export class AssignmentEntityService extends EntityCollectionServiceBase<Assignment> {
    constructor(elementsFactory: EntityCollectionServiceElementsFactory) {
      super('Assignment', elementsFactory);
    }
}