import { Injectable } from "@angular/core";
import { HttpService } from "../core/service/http.service";
import { HttpParams } from "@angular/common/http";
import { Observable } from "rxjs";

export interface StatsResponse {
  success: boolean;
  total_orders: number;
  pending_orders: number;
  completed_orders: number;
}

@Injectable({
  providedIn: "root",
})
export class StatisticsService extends HttpService {
  getStats(): Observable<StatsResponse> {
    return this.posts("/api/v1/stats/", new HttpParams(), null);
  }
}
