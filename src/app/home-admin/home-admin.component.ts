import { Component, OnInit, ViewChild, Inject, ChangeDetectorRef, ChangeDetectionStrategy  } from '@angular/core';
import { LOCAL_STORAGE, StorageService } from 'ngx-webstorage-service';
import { Router } from '@angular/router';
import { ADMINITEMS } from '../common/menu';
import { MediaMatcher } from '@angular/cdk/layout';
import {MatSidenavModule} from '@angular/material/sidenav';
import { Observable } from 'rxjs';
import {CookieService} from 'ngx-cookie-service';

@Component({
  selector: 'home-admin',
  templateUrl: './home-admin.component.html',
  styleUrls: ['./home-admin.component.scss']
})
export class HomeAdminComponent implements OnInit {
  @ViewChild('sidenav') sidenav: MatSidenavModule;
  isExpanded = false;
  element: HTMLElement;
  toolbarTitle$:Observable<string>
  mobileQuery: MediaQueryList;
  menuItems=ADMINITEMS;
  dashboardUrl:string="/home-admin";
  private _mobileQueryListener: () => void;

  constructor(private router: Router, @Inject(LOCAL_STORAGE) private storage: StorageService, 
  private changeDetectorRef: ChangeDetectorRef, media: MediaMatcher,private cookieService: CookieService) { 
    this.mobileQuery = media.matchMedia('(min-width: 768px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }

  ngOnInit(): void {
  }

  logout(){
    this.cookieService.delete("access_token");
    this.storage.remove("user_data");
    this.router.navigate(['/registration']);
  }

}
