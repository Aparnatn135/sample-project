import { Component, OnInit, ViewChild, Inject, ChangeDetectorRef, ChangeDetectionStrategy  } from '@angular/core';
import { LOCAL_STORAGE, StorageService } from 'ngx-webstorage-service';
import { Router } from '@angular/router';
import { MENUITEMS } from '../common/menu';
import { Observable } from 'rxjs';
import { MediaMatcher } from '@angular/cdk/layout';
import {MatSidenavModule} from '@angular/material/sidenav';

@Component({
  selector: 'home-student',
  templateUrl: './home-student.component.html',
  styleUrls: ['./home-student.component.scss'],
  changeDetection : ChangeDetectionStrategy.OnPush
})
export class HomeStudentComponent implements OnInit {
  
  @ViewChild('sidenav') sidenav: MatSidenavModule;
  isExpanded = false;
  element: HTMLElement;
  toolbarTitle$:Observable<string>
  mobileQuery: MediaQueryList;
  menuItems=MENUITEMS;
  dashboardUrl:string="/home-student";
  private _mobileQueryListener: () => void;

  constructor(private router: Router, @Inject(LOCAL_STORAGE) private storage: StorageService, 
  private changeDetectorRef: ChangeDetectorRef, media: MediaMatcher , ) { 
    this.mobileQuery = media.matchMedia('(min-width: 768px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }

  ngOnInit(): void {
    
  }




 logout(){
   this.storage.remove("user_data");
   this.router.navigate(['/registration']);
 }

}
