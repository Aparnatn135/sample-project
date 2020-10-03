import { Component, OnInit,ViewChild } from '@angular/core';
import { HttpService } from '../../core/service/http.service';
import { HttpParams } from "@angular/common/http";
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl,Validators } from '@angular/forms';
import {ThemePalette} from '@angular/material/core';
import {ProgressSpinnerMode} from '@angular/material/progress-spinner';
import { Router } from '@angular/router';
import { AgGridAngular } from 'ag-grid-angular';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { forkJoin } from 'rxjs';
import {HttpHeaders } from '@angular/common/http';
import * as moment from 'moment';
import { NgCircleProgressModule } from 'ng-circle-progress';


@Component({
  selector: 'order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.scss'],
  styles: [`
  ::ng-deep nb-layout-column {
    display: flex;
    justify-content: center;
  }
  :host {
    display: flex;
  }
  nb-chat {
    width: 300px;
    margin: 1rem;
  }
`],
})
export class OrderDetailsComponent implements OnInit {
  @ViewChild('agGrid') agGrid: AgGridAngular;  
  messages: any[] = [];
  userId=[];
  progressOrders:any=[];
 
  columnDefs = [];
  rowData = [];
  gridApi;
  links = ['Student', 'Expert', 'Student+Expert'];
  activeLink = this.links[0];
  background: ThemePalette = 'primary';
  color: ThemePalette = 'primary';
  mode: ProgressSpinnerMode = 'determinate';
  value = 10;
durationInSeconds = 5;
  gotochat()
   {
    this.r.navigateByUrl("/chats")
   
   }
  order_id:any;
   orderStatus:string;
  form = new FormGroup({

    title: new FormControl('', [Validators.required]),
     content: new FormControl('', [Validators.required]),
     work_percent: new FormControl('', [Validators.required]),
     username: new FormControl('', [Validators.required]),
     status: new FormControl('', [Validators.required]),
     attachments: new FormControl(''),
     skills_required: new FormControl(''),
     skills_add:new FormControl('', [Validators.required]),
    file: new FormControl('', [Validators.required]),
  });
  
  fileForm = new FormGroup({
    file: new FormControl('', [Validators.required])
  });
  progressform = new FormGroup({
    work_percent: new FormControl('', [Validators.required]),
     content: new FormControl('', [Validators.required]),
  });
  skills:any=[];
  files:any=[];
  filePath:string;
  myFiles:string [] = [];
  constructor(private route:Router,private r:Router,private httpService:HttpService,private activatedRoute:ActivatedRoute,private router: Router,private http:HttpClient) { }

  ngOnInit(): void {
   
    this.activatedRoute.queryParams.subscribe(params => {
      this.order_id=params['orderid'];  
      });
    
      const payload = new HttpParams()
      .set('order_id', this.order_id);
    this.httpService.posts('/api/v1/get_progress_info/',payload,null).subscribe(data=>{
      if(data && data.success){
        let totalPercent=0;
        data.progress.forEach(element => {
          element.percent=totalPercent+element.progress;
          totalPercent=element.percent;
        this.progressOrders.push(element);
        });
        this.progressform = new FormGroup({
          work_percent: new FormControl(this.progressOrders[0].progress),
           content: new FormControl(this.progressOrders[0].info),
           user: new FormControl(this.progressOrders[0].updated_by_username)
        });
   }       
  }); 
    // const payload = new HttpParams()
    // .set('order_id', this.order_id);

    this.httpService.posts('/api/v1/get_order_info/',payload,null).subscribe(data=>{
           if(data && data.success){
             this.skills=data.orders_info.skills_required.split(',');
             this.orderStatus=data.orders_info.status;
             this.filePath=data.orders_info.attachments_path;
            this.form = new FormGroup({
              title: new FormControl(data.orders_info.title, [Validators.required]),
              content: new FormControl(data.orders_info.content, [Validators.required]),
              username: new FormControl(data.orders_info.username, [Validators.required]),
              status: new FormControl(data.orders_info.status, [Validators.required]),
              skills_add: new FormControl(this.skills, [Validators.required]),
            });
            data.orders_info.attachments.forEach(attachment => {
              attachment.reference_file_name=data.orders_info.attachments_path+attachment.reference_file_name;
            });
            this.files = data.orders_info.attachments;
          }
           },(error => {
             if(error) {

             }      
         }));  
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
            this.route.navigate(['/home-admin/bids']);
          }
          });
      
        }
  removeFile(file){
    this.myFiles.splice(this.myFiles.indexOf(file), 1);
   }

 
   
  approveOrder(){
    const payload = new HttpParams()
    .set('order_id', this.order_id);

    this.httpService.posts('/api/v1/approve_order/',payload,null).subscribe(data=>{
      if(data && data.success){
        this.router.navigate(['/home-admin/orders']);

     }
      },(error => {
        if(error) {

        }      
    }));   

  }
  onFileChange(event) {
    for (var i = 0; i < event.target.files.length; i++) { 
      if(this.myFiles.indexOf(event.target.files[i])<0)
      this.myFiles.push(event.target.files[i]);
  }
  console.log(this.myFiles)
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.fileForm.patchValue({
        file: file
      });
    }
  }
  upload() {
    let attachmentId=[];
    this.form.removeControl("file");
      let headers= new HttpHeaders();
        let calls = [];
        for (var i = 0; i <this.myFiles.length; i++) { 
          const formData = new FormData();
          formData.append("fileToUpload", this.myFiles[i]);
          calls.push(this.httpService.posts('/api/v1/add_attachment/',formData,headers));
        }
        forkJoin(...calls).subscribe(
          data => { 
        data.forEach(element => {
          attachmentId.push(element.attachment_id);
        });

        const payload = new HttpParams()
        .set('order_id', this.order_id)
        .set('updated_progress', this.form.value.work_percent)
         .set('info', this.form.value.content)
         .set('attachments', attachmentId.toString());
               this.httpService.posts('/api/v1/update_progress/',payload,null).subscribe(data=>{
                      if(data && data.success){        
                       this.router.navigate(['/home-admin/assignments']);
                   }       
                  });

          }, err => console.log('error ' + err),
          () => console.log('Ok ')
        );
    }

    onSelectionChange(e){
  this.progressform = new FormGroup({
  work_percent: new FormControl(this.progressOrders[e.selectedIndex].progress),
   content: new FormControl(this.progressOrders[e.selectedIndex].info),
   user: new FormControl(this.progressOrders[0].updated_by_username)
});
    }
}
