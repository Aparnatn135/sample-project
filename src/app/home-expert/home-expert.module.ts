import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {OrdersComponent} from './orders/orders.component';
import { HomeExpertRoutingModule } from './home-expert-routing.module';
import { HomeExpertComponent } from './home-expert.component';
import { MaterialModule } from '../common/material/material.module';
import { ComponentsModule } from '../components/components.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProfileComponent } from './profile/profile.component';
import {ChangePasswordComponent} from './change-password/change-password.component';
import {OrderDetailsComponent} from './order-details/order-details.component';
import {BidsComponent} from './bids/bids.component';
import {BidDetailsComponent} from './bid-details/bid-details.component';
import { AgGridModule } from 'ag-grid-angular';
import { AssignmentsComponent } from './assignments/assignments.component';
import { UploadAssignmentComponent } from './upload-assignment/upload-assignment.component';
import { ChatComponent } from './chat/chat.component';
@NgModule({
  declarations: [HomeExpertComponent, DashboardComponent,BidsComponent,BidDetailsComponent, OrderDetailsComponent,ProfileComponent,ChangePasswordComponent,OrdersComponent, AssignmentsComponent, UploadAssignmentComponent, ChatComponent],
  imports: [
    CommonModule,
    AgGridModule.withComponents([]),
    HomeExpertRoutingModule,
    MaterialModule,
    ComponentsModule
  ]
})
export class HomeExpertModule { }
