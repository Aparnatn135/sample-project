import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl,Validators,FormArray } from '@angular/forms';
import {HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { forkJoin } from 'rxjs';
import { HttpService } from '../../core/service/http.service';
import { HttpParams } from "@angular/common/http";
import { Router,ActivatedRoute } from '@angular/router';

@Component({
  selector: 'upload-assignment',
  templateUrl: './upload-assignment.component.html',
  styleUrls: ['./upload-assignment.component.scss']
})
export class UploadAssignmentComponent implements OnInit {

  constructor(private httpService:HttpService,private router: Router,private activatedRoute:ActivatedRoute) { }
  myFiles:string [] = [];
  order_id:any
  progressOrders:any=[];
  progressform = new FormGroup({
    work_percent: new FormControl('', [Validators.required]),
     content: new FormControl('', [Validators.required]),
     user: new FormControl('', [Validators.required]),
  });
  form = new FormGroup({
    work_percent: new FormControl('', [Validators.required]),
     content: new FormControl('', [Validators.required]),
     attachments: new FormControl(''),
    file: new FormControl('', [Validators.required]),
  });

  fileForm = new FormGroup({
    file: new FormControl('', [Validators.required])
  });
  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe(params => {
      this.order_id=params['orderid']; 
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
             content: new FormControl(this.progressOrders[0].info)
          });
     }       
    }); 
      });
  }

  removeFile(file){
    this.myFiles.splice(this.myFiles.indexOf(file), 1);
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
                       this.router.navigate(['/home-expert/order-detail']);
                   }       
                  });

          }, err => console.log('error ' + err),
          () => console.log('Ok ')
        );
    }

    onSelectionChange(e){
  this.progressform = new FormGroup({
  work_percent: new FormControl(this.progressOrders[e.selectedIndex].progress),
   content: new FormControl(this.progressOrders[e.selectedIndex].info)
});
    }
  

}
