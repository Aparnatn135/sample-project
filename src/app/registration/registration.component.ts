import { Component, OnInit, Inject } from '@angular/core';
import { AppState } from '../redux/app.reducer';
import { Store } from '@ngrx/store';
import { signupWithEmailPassword, loginWithEmailPassword } from './redux/registration.actions';
import { setLandingPage, setUserType, showLoader } from '../redux/app.actions';
import { LOCAL_STORAGE, StorageService } from 'ngx-webstorage-service';
import { Router } from '@angular/router';
import {CookieService} from 'ngx-cookie-service';
import { HttpService } from '../core/service/http.service';

import { HttpParams } from "@angular/common/http";

@Component({
  selector: 'registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {

  userType: number;
  message:string;
  isMessage:boolean=false;
  constructor(private router: Router,private cookieService: CookieService, @Inject(LOCAL_STORAGE) private storage: StorageService,private httpService:HttpService) {
  }

  ngOnInit(): void {
    this.userType = 0;
  }

  submitClicked(formObject) {
    
    switch (Number(formObject.formType)) {
      case 0:
        const payload = new HttpParams()
  .set('name', formObject.formData.name)
  .set('username', formObject.formData.username) 
  .set('email', formObject.formData.email)
  .set('password', formObject.formData.password)
  .set('role', formObject.formData.role);
        this.httpService.posts('/api/v1/register/',payload,null).subscribe(data=>{
          this.isMessage=true;
        if(data && data.success){
          this.message="Registration completed.";
          this.userType = 2;
        }
       else if(data && !data.success)
       this.message="Username/Email id already registered.";
        },(error => {
          if(error) {
           this.message=error;
           }      
        }));
        break;

      case 2:
      const param = new HttpParams()
      .set('username', formObject.formData.username) 
      .set('password', formObject.formData.password)
      .set('role', formObject.formData.role);
      this.httpService.posts('/api/v1/login/',param,null).subscribe(data=>{
      if(data && data.success){
        let user_data={"userid":null,"token":null};
        this.isMessage=false;
        this. storage.set("access_token", data.access_token);
        this. storage.set("user_id", data.user_id);
        if(formObject.formData.role==="st")
        this.router.navigate(['/home-student/dashboard']);
        else if(formObject.formData.role==="ex")
        this.router.navigate(['/home-expert/dashboard']);
        else if(formObject.formData.role==="cm")
        this.router.navigate(['/home-manager/dashboard']);
        else if(formObject.formData.role==="su")
        this.router.navigate(['/home-admin/dashboard']);
      }
     else if(data && !data.success){
      this.isMessage=true;
      this.message=data.error;
     }
    
      },(error => {
        if(error) {
         this.message=error;
         }      
      }));
        break;

    }
  }

}
