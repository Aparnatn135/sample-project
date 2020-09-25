import {
  Component,
  OnInit,
  ViewChild,
  Inject,
  ChangeDetectorRef,
  ChangeDetectionStrategy,
} from "@angular/core";
import { LOCAL_STORAGE, StorageService } from "ngx-webstorage-service";
import { Router } from "@angular/router";
import { EXPERTITEMS } from "../common/menu";
import { MediaMatcher } from "@angular/cdk/layout";
import { MatSidenavModule, MatSidenav } from "@angular/material/sidenav";
import { Observable } from "rxjs";
import { CookieService } from "ngx-cookie-service";
@Component({
  selector: "home-expert",
  templateUrl: "./home-expert.component.html",
  styleUrls: ["./home-expert.component.scss"],
})
export class HomeExpertComponent implements OnInit {
  @ViewChild("sidenav") sidenav: MatSidenavModule;

  @ViewChild('snav', { static: false }) matSidenav: MatSidenav;

  isExpanded = false;

  element: HTMLElement;

  toolbarTitle$: Observable<string>;

  mobileQuery: MediaQueryList;

  menuItems = EXPERTITEMS;

  dashboardUrl: string = "/home-expert";

  private _mobileQueryListener: () => void;

  constructor(
    private router: Router,
    @Inject(LOCAL_STORAGE) private storage: StorageService,
    private changeDetectorRef: ChangeDetectorRef,
    media: MediaMatcher,
    private cookieService: CookieService
  ) {
    this.mobileQuery = media.matchMedia("(min-width: 768px)");
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }

  ngOnInit(): void {
    if (!this.mobileQuery.matches) {
      this.isExpanded = true;
      // this.matSidenav.close();
    }
  }

  toggleSideNave() {
    if (!this.mobileQuery.matches) {
      this.matSidenav.toggle();
    } else {
      this.isExpanded = !this.isExpanded;
    }
  }

  logout() {
    this.cookieService.delete("access_token");
    this.storage.remove("user_data");
    this.router.navigate(["/registration"]);
  }
}
