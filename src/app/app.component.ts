import { Component, OnInit, Inject } from '@angular/core';
import { LoaderService } from './core/loader/loader.service';
import { LOCAL_STORAGE, StorageService } from 'ngx-webstorage-service';
import { Router } from '@angular/router';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor(public loaderService: LoaderService,private router: Router, @Inject(LOCAL_STORAGE) private storage: StorageService){
if(null==storage.get("user_id") ||storage.get("user_id")==undefined)
this.router.navigate(['/registration']);
  }

  ngOnInit(){
  
  }

}
