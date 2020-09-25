import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeManagerRoutingModule } from './home-manager-routing.module';
import { HomeManagerComponent } from './home-manager.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { TutorsComponent } from './tutors/tutors.component';
import { StudentsComponent } from './students/students.component';
import { EntityDefinitionService, EntityDataService, EntityOp } from '@ngrx/data';
import { AssignmentDataService } from './redux/assignment/assignment.dataservice';
import { Assignment } from './redux/assignment/assignment.entityservice';
import { ComponentsModule } from '../components/components.module';
import { MaterialModule } from '../common/material/material.module';
import { reducers , metaReducers} from './admin.root.redux';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { AuthEffects } from '../redux/auth.effects';
import { ProfileComponent } from './profile/profile.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { OrdersComponent } from './orders/orders.component';
import { AgGridModule } from 'ag-grid-angular';
import { OrderDetailsComponent } from './order-details/order-details.component';
import {BidsComponent} from './bids/bids.component';
import {BidDetailsComponent} from './bid-details/bid-details.component';
import { AssignmentsComponent } from './assignments/assignments.component';
import { UploadAssignmentComponent} from './upload-assignment/upload-assignment.component';
import { ChatComponent } from './chat/chat.component';
@NgModule({
  declarations: [HomeManagerComponent, DashboardComponent,BidsComponent,BidDetailsComponent, ChangePasswordComponent,ProfileComponent,AssignmentsComponent, TutorsComponent, StudentsComponent, OrdersComponent, OrderDetailsComponent,UploadAssignmentComponent,ChatComponent],
  imports: [
    CommonModule,
    HomeManagerRoutingModule,
    ComponentsModule,
    MaterialModule,
    AgGridModule.withComponents([]),
    StoreModule.forFeature('adminInfo', reducers, {
      metaReducers
    }),
    EffectsModule.forFeature([AuthEffects]),
  ]
})
export class HomeManagerModule {
    constructor(private eds: EntityDefinitionService, entityDataService: EntityDataService, private assignmentDataService: AssignmentDataService) {
      eds.registerMetadataMap(metadata);
      entityDataService.registerService('Assignment', assignmentDataService)

    }

}

export const metadata = {
  Assignment: {

  }
}
