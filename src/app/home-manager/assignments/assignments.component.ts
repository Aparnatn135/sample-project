import { Component, OnInit,ViewChild } from '@angular/core';
import { HttpService } from '../../core/service/http.service';
import { HttpParams } from "@angular/common/http";
import { AgGridAngular } from 'ag-grid-angular';
import * as moment from 'moment';
import { Router } from '@angular/router';

@Component({
  selector: 'assignments',
  templateUrl: './assignments.component.html',
  styleUrls: ['./assignments.component.scss']
})
export class AssignmentsComponent implements OnInit {
  @ViewChild('agGrid') agGrid: AgGridAngular;
  columnDefs = [];
  rowData = [];

  constructor(private httpService:HttpService,private route:Router) { }

  ngOnInit(): void {
    this.columnDefs = [
      {headerName: 'Title', field: 'title' },
      {headerName: 'Date Created', field: 'created_on',valueFormatter: this.dateFormatter },
      {headerName: '% Comepleted', field: 'progress' },
      {headerName: 'Tutor', field: 'username' },
  ];
  this.fetchOrders();
  }

  onGridReady(e){
    this.agGrid.api.sizeColumnsToFit();
    this.agGrid.api.setColumnDefs(this.columnDefs);
  }

  dateFormatter(params) {
    return moment.unix(params.value).format('MM/DD/YYYY HH:mm');
   }

   fetchOrders(){
    this.rowData=[];
    const payload = new HttpParams()
    .set('order_type', "ORDER_EXECUTED")
    .set('page_no', "1")
    .set('orders_per_page', "10")
    .set('sort_by', "created_on:desc");
    this.httpService.posts('/api/v1/show_orders/',payload,null).subscribe(data=>{
    if(data.success){
      this.agGrid.api.setRowData(data.data);
    }
     
    });
  }
 

  onRowClicked(e){
    this.route.navigate(['/home-manager/upload-assignment'], { queryParams: { orderid:e.data.id } });
  }
}
