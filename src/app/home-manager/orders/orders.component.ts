import { Component, OnInit,ViewChild } from '@angular/core';
import { HttpService } from '../../core/service/http.service';
import { HttpParams } from "@angular/common/http";
import * as moment from 'moment';
import { orders } from './../../common/ordertype-list';
import { Router } from '@angular/router';
import { AgGridAngular } from 'ag-grid-angular';

@Component({
  selector: 'orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {
  @ViewChild('agGrid') agGrid: AgGridAngular;
  orderList=orders;
  columnDefs=[];
  selectedIndex: number;
rowData = [];
selectedOrder;

  constructor(private httpService:HttpService,private route:Router,) { }

  ngOnInit(): void {
    this.selectedIndex=0;
    this.columnDefs = [
      {headerName: 'Title', field: 'title' },
      {headerName: 'User Name', field: 'username' },
      {headerName: 'Date Created', field: 'created_on',valueFormatter: this.dateFormatter }
  ];
    this.selectedOrder=this.orderList[0].code;
    this.fetchOrders(this.orderList[0].code);
  }
  onGridReady(e){
    this.agGrid.api.sizeColumnsToFit();
    this.agGrid.api.setColumnDefs(this.columnDefs);
  }
  orderChange(code,index){
    this.selectedIndex=index;
this.fetchOrders(code);
  }

  dateFormatter(params) {
   return moment.unix(params.value).format('MM/DD/YYYY HH:mm');
  }

  onRowClicked(event){
    this.route.navigate(['/home-manager/order-detail'], { queryParams: { orderid:event.data.id } });
  }

  fetchOrders(code){
    this.rowData=[];
    const payload = new HttpParams()
    .set('order_type', code)
    .set('page_no', "1")
    .set('orders_per_page', "10")
    .set('sort_by', "created_on:desc");
    this.httpService.posts('/api/v1/show_orders/',payload,null).subscribe(data=>{
    if(data.success){
   this.agGrid.api.setRowData(data.data);
    }
     
    });
  }
}
