import { Component,Inject,Input } from '@angular/core';
import { LOCAL_STORAGE, StorageService } from 'ngx-webstorage-service';
import { Router } from '@angular/router';
import {  } from '@angular/platform-browser';
import {CookieService} from 'ngx-cookie-service';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: []
})
export class AppHeaderComponent {
  @Input() dashboard: string;

  constructor(private router: Router, @Inject(LOCAL_STORAGE) private storage: StorageService,private cookieService: CookieService) { 
  }
  
  getprofile(){
   this.router.navigate([this.dashboard+'/profile']);
  }
  changePassword(){
    this.router.navigate([this.dashboard+'/changepassword']);
  }
  logout(){
    this.storage.remove("user_id");
    this.storage.remove("access_token");
    this.router.navigate(['/registration']);
  }


}
