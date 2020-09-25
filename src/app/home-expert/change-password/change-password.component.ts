import { Component, OnInit,Inject } from '@angular/core';
import { FormGroup, FormControl, Validators  } from '@angular/forms';
import { HttpService } from '../../core/service/http.service';
import { HttpParams } from "@angular/common/http";
import { Router } from '@angular/router';
import { LOCAL_STORAGE, StorageService } from 'ngx-webstorage-service';
@Component({
  selector: 'change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {

  changepasswordForm = new FormGroup({
    password: new FormControl('',Validators.pattern('^(?=.*[0-9])(?=.*[a-zA-Z]).{8,30}$')),
    confirm_password: new FormControl('',Validators.required),
  },this.passwordMatchValidator);

  constructor(private httpService:HttpService,private router: Router,@Inject(LOCAL_STORAGE) private storage: StorageService) { }

  ngOnInit(): void {
  }

  passwordMatchValidator(frm: FormGroup) {
    return frm.controls['password'].value === frm.controls['confirm_password'].value ? null : {'mismatch': true};
  }

  updatePassword(){
    const payload = new HttpParams()
    .set('new_password', this.changepasswordForm.value.password);

    this.httpService.posts('/api/v1/profile_set/password',payload,null).subscribe(data=>{
            console.log(data);
           if(data && data.success){
            this.storage.remove("user_id");
            this.storage.remove("access_token");
            this.router.navigate(['/registration']);
           }

           },(error => {
             if(error) {

             }      
         }));

  }

}
