import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../core/service/http.service';
import { HttpParams } from "@angular/common/http";
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl,Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {ThemePalette} from '@angular/material/core';
import {ProgressSpinnerMode} from '@angular/material/progress-spinner';
import { StarRatingComponent } from 'ng-starrating';
import { Observable } from 'rxjs';
import { forkJoin } from 'rxjs';
import {HttpHeaders } from '@angular/common/http';
import * as moment from 'moment';

@Component({
  selector: 'order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.scss']
})
export class OrderDetailsComponent implements OnInit {
  color: ThemePalette = 'primary';
  mode: ProgressSpinnerMode = 'determinate';
  value = 10;
  order_id:any;
   ratings=5;
  totalstar=5;
  links = ['Student', 'Expert', 'Student+Expert'];
  activeLink = this.links[0];
  background: ThemePalette = 'primary';
  progressOrders:any=[];
  form = new FormGroup({

    title: new FormControl('', [Validators.required]),
     content: new FormControl('', [Validators.required]),
     username: new FormControl('', [Validators.required]),
     status: new FormControl('', [Validators.required]),
     attachments: new FormControl(''),
     skills_required: new FormControl(''),
     skills_add:new FormControl('', [Validators.required]),
    file: new FormControl('', [Validators.required]),
  });

  completeAssignmentform = new FormGroup({
     review: new FormControl('', [Validators.required]),
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
  orderStatus:string;
  myFiles:string [] = [];
  constructor(private httpService:HttpService,private activatedRoute:ActivatedRoute,private router: Router,) { }

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
  }
  completeOrder(){
    const payload = new HttpParams()
    .set('order_id', this.order_id)
    .set('rating', this.ratings.toString())
    .set('review', this.completeAssignmentform.value.review);
    this.httpService.posts('/api/v1/mark_order_completed/',payload,null).subscribe(data=>{
    if(data && data.success)
    this.router.navigate(['/home-student/myassignments']);
    });

  }

  onRate($event:{oldValue:number, newValue:number, starRating:StarRatingComponent}) {
    this.ratings=$event.newValue;
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
