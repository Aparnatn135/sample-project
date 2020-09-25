import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {OrdersComponent} from './orders/orders.component';
import { HomeExpertComponent } from './home-expert.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import {ChangePasswordComponent} from './change-password/change-password.component';
import { ProfileComponent } from './profile/profile.component';
import {OrderDetailsComponent} from './order-details/order-details.component';
import {BidsComponent} from './bids/bids.component';
import {BidDetailsComponent} from './bid-details/bid-details.component';
import { AssignmentsComponent } from './assignments/assignments.component';
import { UploadAssignmentComponent} from './upload-assignment/upload-assignment.component';
import { ChatComponent } from './chat/chat.component';


const routes: Routes = [{
  path: '', component: HomeExpertComponent,
  children: [
    { path: 'profile', component: ProfileComponent },
    { path: 'dashboard', component: DashboardComponent },
    { path: 'changepassword', component: ChangePasswordComponent },
    { path: 'orders', component: OrdersComponent },
    { path: 'order-detail', component: OrderDetailsComponent },
    { path: 'bids', component: BidsComponent },
    { path: 'bid-detail', component: BidDetailsComponent },
    { path: 'assignments', component: AssignmentsComponent },
    { path: 'upload-assignment', component: UploadAssignmentComponent },
    { path: 'chat', component: ChatComponent }


  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeExpertRoutingModule { }
