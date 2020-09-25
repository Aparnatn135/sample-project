import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./registration/registration.module').then(m => m.RegistrationModule)
  },
  {
    path: 'registration',
    loadChildren: () => import('./registration/registration.module').then(m => m.RegistrationModule)
  },
  {
    path: 'home-student',
    loadChildren: () => import('./home-student/home-student.module').then(m => m.HomeStudentModule)
  },
  {
    path: 'home-expert',
    loadChildren: () => import('./home-expert/home-expert.module').then(m => m.HomeExpertModule)
  },
  {
    path: 'home-admin',
    loadChildren: () => import('./home-admin/home-admin.module').then(m => m.HomeAdminModule)
  },
  {
    path: 'home-manager',
    loadChildren: () => import('./home-manager/home-manager.module').then(m => m.HomeManagerModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
