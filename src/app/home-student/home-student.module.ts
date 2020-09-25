import { NgModule ,CUSTOM_ELEMENTS_SCHEMA,NO_ERRORS_SCHEMA} from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';

import { HomeStudentRoutingModule } from './home-student-routing.module';
import { HomeStudentComponent } from './home-student.component';
import { NewAssignmentComponent } from './new-assignment/new-assignment.component';
import { MaterialModule } from './../common/material/material.module';
import { ComponentsModule } from './../components/components.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MyAssignmentsComponent } from './my-assignments/my-assignments.component';
import {OrderDetailsComponent} from './order-details/order-details.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { ProfileComponent } from './profile/profile.component';
import { AgGridModule } from 'ag-grid-angular';
import {StarRatingModule} from 'angular-star-rating';
import { RatingModule } from 'ng-starrating';
import { ChatComponent } from './chat/chat.component';
@NgModule({
  declarations: [HomeStudentComponent, NewAssignmentComponent, DashboardComponent, OrderDetailsComponent,MyAssignmentsComponent, ProfileComponent,ChangePasswordComponent, ChatComponent],
  imports: [

    CommonModule,
    HomeStudentRoutingModule,
    ComponentsModule,
    MaterialModule,
    RatingModule,
   StarRatingModule.forRoot(),
    AgGridModule.withComponents([]),
  ],
  providers: [DatePipe],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA,
    NO_ERRORS_SCHEMA
  ]
})
export class HomeStudentModule {
  constructor() {

  }

}

export const metadata = {
  Assignment: {

  }
}
