import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../core/service/http.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  profileForm = new FormGroup({
    name: new FormControl('', Validators.required),
    email: new FormControl('', Validators.required),
    mobile_no: new FormControl('', Validators.required),
  });
  constructor(private httpService:HttpService) {
   
   }

  ngOnInit(): void {
   
    this.httpService.posts('/api/v1/profile_get/',"",null).subscribe(data=>{
    if(data.success && data.profile){
      this.profileForm.setValue({
        name: data.profile.name,
        email: data.profile.email,
        mobile_no: data.profile.mobile_no
      });
    }
     
    });
  }

}
