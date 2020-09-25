import { Component, OnInit,ViewChild } from '@angular/core';
import { HttpService } from '../../core/service/http.service';
import { HttpParams } from "@angular/common/http";
import { FormGroup, FormControl,Validators } from '@angular/forms';
import { AgGridAngular } from 'ag-grid-angular';
import {Router, ActivatedRoute } from '@angular/router';
import {CURRENCYITEMS} from '../../common/currencyList';

@Component({
  selector: 'bid-details',
  templateUrl: './bid-details.component.html',
  styleUrls: ['./bid-details.component.scss']
})
export class BidDetailsComponent implements OnInit {
  @ViewChild('agGrid') agGrid: AgGridAngular;
  bidsform = new FormGroup({
    bid_note: new FormControl('', [Validators.required]),
     expected_price_currency: new FormControl('', [Validators.required]),
     expected_price: new FormControl('', [Validators.required]),
  });
  order_id;
  currencyList=CURRENCYITEMS;
  constructor(private httpService:HttpService,private route:Router,private activatedRoute:ActivatedRoute) { }
 

  ngOnInit(): void {


  this.activatedRoute.queryParams.subscribe(params => {
    this.order_id=params['orderid'];  
    });
 this.fetchBidDetail();

  }



  fetchBidDetail(){
    const payload = new HttpParams()
    .set('order_id', this.order_id);
    this.httpService.posts('/api/v1/get_own_bid/',payload,null).subscribe(data=>{
    if(data.success && data.bid_data){
      this. bidsform = new FormGroup({
        bid_note: new FormControl(data.bid_data.bid_note, [Validators.required]),
         expected_price_currency: new FormControl(data.bid_data.expected_price_currency, [Validators.required]),
         expected_price: new FormControl(data.bid_data.expected_price, [Validators.required]),
      });
     
    }
    });
  }

}
