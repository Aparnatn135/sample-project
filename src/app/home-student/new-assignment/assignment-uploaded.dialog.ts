import { Component, Inject } from '@angular/core';

import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { StudentRootState } from '../student.root.redux';
import { Store } from '@ngrx/store';
import { navigateTo } from './../../common/router/redux/router.actions';

export interface DialogData {
    animal: string;
    name: string;
}

@Component({
    selector: 'assignment-uploaded.dialog',
    templateUrl: 'assignment-uploaded.dialog.html',
})
export class AssignmentUploadedDialog {

    constructor(private store:Store<StudentRootState>,
        public dialogRef: MatDialogRef<AssignmentUploadedDialog>,
        @Inject(MAT_DIALOG_DATA) public data: DialogData) { }

    ok(): void {
        this.store.dispatch(navigateTo({path:'home-student/myassignments'}))
        this.dialogRef.close();
    }

}