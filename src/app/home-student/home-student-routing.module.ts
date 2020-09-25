import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MyAssignmentsComponent } from './my-assignments/my-assignments.component';
import {ProfileComponent} from './profile/profile.component';
import { HomeStudentComponent } from './home-student.component';
import { NewAssignmentComponent } from './new-assignment/new-assignment.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import {OrderDetailsComponent} from './order-details/order-details.component';
import { ChatComponent } from './chat/chat.component';
const routes: Routes = [
  {
    path: '', component: HomeStudentComponent,
    children: [
      { path: 'newuser', component: NewAssignmentComponent },
      { path: 'myassignments', component: MyAssignmentsComponent },
      { path: 'new-assignment', component: NewAssignmentComponent },
      { path: 'dashboard', component: DashboardComponent },
      { path: 'profile', component: ProfileComponent },
      { path: 'changepassword', component: ChangePasswordComponent },
      { path: 'order-detail', component: OrderDetailsComponent },
      { path: 'chat', component: ChatComponent },


    ]
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],



  exports: [RouterModule]
})
export class HomeStudentRoutingModule { }
