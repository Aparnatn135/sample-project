import { Component, OnInit } from "@angular/core";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import {
  StatisticsService,
  StatsResponse,
} from "../../service/statistics.service";

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

  stats: stats;

  constructor(private staticsService: StatisticsService) {}

  ngOnInit(): void {
    this.staticsService.getStats().subscribe((stats: StatsResponse) => {
      if (stats.success) {
        this.stats = stats;
      }
    });
  }
}
