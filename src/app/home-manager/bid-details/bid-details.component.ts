import { Component, OnInit,ViewChild } from '@angular/core';
import { HttpService } from '../../core/service/http.service';
import { HttpParams } from "@angular/common/http";
import { AgGridAngular } from 'ag-grid-angular';
import * as moment from 'moment';
import {Router, ActivatedRoute } from '@angular/router';


@Component({
  selector: 'bid-details',
  templateUrl: './bid-details.component.html',
  styleUrls: ['./bid-details.component.scss']
})
export class BidDetailsComponent implements OnInit {
  @ViewChild('agGrid') agGrid: AgGridAngular;
  userId=[];
  columnDefs = [];
  rowData = [];
  order_id;
  constructor(private httpService:HttpService,private route:Router,private activatedRoute:ActivatedRoute) { }
 

  ngOnInit(): void {
       this.columnDefs = [
      {headerName: 'Name', field: 'name' },
      {headerName: 'Note', field: 'bid_note' },
      {headerName: 'Rating', field: 'rating' },
      {headerName: 'Bid Price', field: 'expected_price' },
      {headerName: 'Currency', field: 'expected_price_currency' },
      {headerName: 'Bid Time', field: 'bid_time',valueFormatter: this.dateFormatter }
  ];

  this.activatedRoute.queryParams.subscribe(params => {
    this.order_id=params['orderid'];  
    });
 this.fetchBids();

  }

  dateFormatter(params) {
    return moment.unix(params.value).format('MM/DD/YYYY HH:mm');
   }

  onGridReady(e){
    this.agGrid.api.sizeColumnsToFit();
    this.agGrid.api.setColumnDefs(this.columnDefs);
  }

 fetchBids(){
    const payload = new HttpParams()
    .set('order_id', this.order_id);
    this.httpService.posts('/api/v1/get_bids/',payload,null).subscribe(data=>{
    if(data.success){
      this.agGrid.api.setRowData(data.bids);
    }
    });
  }
  onRowClicked(e){
   
     if(this.userId.indexOf(e.data.user_id)>-1)
     this.userId.splice(this.userId.indexOf(e.data.user_id),1);
      else
     this.userId.push(e.data.user_id);
  }

  executeOrder(){
    const payload = new HttpParams()
    .set('order_id', this.order_id)
    .set('shortlisted_bids',  this.userId.toString());
    this.httpService.posts('/api/v1/execute_order/',payload,null).subscribe(data=>{
    if(data.success){
      this.route.navigate(['/home-manager/bids']);
    }
    });

  }

}
