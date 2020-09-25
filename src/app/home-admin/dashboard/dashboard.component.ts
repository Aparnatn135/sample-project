import { Component, OnInit } from "@angular/core";
import { AssignmentEntityService } from "../redux/assignment/assignment.entityservice";
import { Observable } from "rxjs";
import { BreakpointObserver, Breakpoints } from "@angular/cdk/layout";

// import { ActivatedRoute } from '@angular/router';
import { map } from "rxjs/operators";
import { StatisticsService, StatsResponse } from 'src/app/service/statistics.service';
// import {LayoutModule} from '@angular/cdk/layout';
// import { HttpService } from '../../core/service/http.service';
// import { HttpClient } from '@angular/common/http';
// import { HttpParams } from "@angular/common/http";

interface stats {
  total_orders: number;
  pending_orders: number;
  completed_orders: number;
}

@Component({
  selector: "dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.scss"],
})
export class DashboardComponent implements OnInit {
  length$: Observable<number>;
  // postData;
  // user_id:any;
  // collection={};

  stats: stats;

  constructor(
    private assignmentEntityService: AssignmentEntityService,
    breakpointObserver: BreakpointObserver,
    private staticsService: StatisticsService
  ) {}

  ngOnInit(): void {
    this.assignmentEntityService.getAll();

    this.length$ = this.assignmentEntityService.entities$.pipe(
      map((entities) => entities.length)
    );

    this.loadStats();
  }

  private loadStats() {
    this.staticsService.getStats().subscribe((stats: StatsResponse) => {
      if (stats.success) {
        this.stats = stats;
      }
    });
  }
}
