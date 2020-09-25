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
  columnDefs = [];
rowData = [];
page_no;
total_pages;
orders_per_page;
selectedOrder;
selectedIndex:any;
gridApi;
private paginationNumberFormatter;
  constructor(private httpService:HttpService,private route:Router,) { }

  ngOnInit(): void {
    this.selectedIndex=0;
    this.columnDefs = [
      {headerName: 'Title', field: 'title' },
      {headerName: 'User Name', field: 'username' },
      {headerName: 'Date Created', field: 'created_on',valueFormatter: this.dateFormatter }
  ];
    this.selectedOrder=this.orderList[0].code;
    this.fetchOrders(this.orderList[0].code,1,2);
  }
  onGridReady(e){
    this.gridApi = e.api;
    this.agGrid.api.sizeColumnsToFit();
    this.agGrid.api.setColumnDefs(this.columnDefs);
    
    
  }
  orderChange(code,index){
    this.selectedOrder=code;
    this.selectedIndex=index;
this.fetchOrders(code,1,2);
  }

  dateFormatter(params) {
   return moment.unix(params.value).format('MM/DD/YYYY HH:mm');
  }
 
  onRowClicked(event){
    this.route.navigate(['/home-admin/order-detail'], { queryParams: { orderid:event.data.id } });
  }

  fetchOrders(code,pageNo,orderPerPage){
    this.rowData=[];
    const payload = new HttpParams()
    .set('order_type', code)
    .set('page_no',pageNo)
    .set('orders_per_page',orderPerPage)
    .set('sort_by', "created_on:desc");
    this.httpService.posts('/api/v1/show_orders/',payload,null).subscribe(data=>{
    if(data.success){
      this.agGrid.api.setRowData(data.data);
      this.page_no=data.page_no;
      this.total_pages=data.total_pages;
      this.orders_per_page=data.orders_per_page;
    }
     
    });
  }

  onBtFirst() {
    this.fetchOrders(this.selectedOrder,1,this.orders_per_page);
  }

  onBtLast() {
    this.fetchOrders(this.selectedOrder,this.total_pages,this.orders_per_page);
  }

  onBtNext() {
    this.fetchOrders(this.selectedOrder,this.page_no+1,this.orders_per_page);
  }

  onBtPrevious() {
    this.fetchOrders(this.selectedOrder,this.page_no-1,this.orders_per_page);
  }

  changePage(e){
    this.fetchOrders(this.selectedOrder,1,this.orders_per_page);
  }
}
