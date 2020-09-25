import { Component, OnInit, ViewChild } from '@angular/core';
import { subjects } from 'src/app/common/subject-list';
import { FormGroup, FormControl,Validators,FormArray } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { MatInput } from '@angular/material/input';
import {HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { forkJoin } from 'rxjs';
import * as moment from 'moment';
import { HttpService } from '../../core/service/http.service';
import { HttpParams } from "@angular/common/http";
import { Router } from '@angular/router';
import {MatDialog} from '@angular/material/dialog';
import { MyDialogComponent } from 'src/app/components/my-dialog/my-dialog.component';
import { DialogsComponent } from 'src/app/components/dialogs/dialogs.component';

@Component({
  selector: 'new-assignment',
  templateUrl: './new-assignment.component.html',
  styleUrls: ['./new-assignment.component.scss']
})
export class NewAssignmentComponent implements OnInit {

  subjectList = subjects;
  @ViewChild('deadline', { static: true }) deadline: MatInput;

  deadlineDate = new Date();
  skills: string[] = ['Java', 'Python', 'PHP', 'Angular'];
  deltaDays = 0;
  deltaHours = 0
selectedSkills:any=[];
myFiles:string [] = [];
  form = new FormGroup({

    title: new FormControl('', [Validators.required]),
     content: new FormControl('', [Validators.required]),
     attachments: new FormControl(''),
     skills_required: new FormControl(''),
     skills_add:new FormControl('', [Validators.required]),
     deadline: new FormControl(this.transformDate(this.deadlineDate)),
    file: new FormControl('', [Validators.required]),
  });

  fileForm = new FormGroup({
    file: new FormControl('', [Validators.required])
  });

  
  filteredOptions: Observable<any[]>;
  constructor(private datePipe: DatePipe,private httpService:HttpService,private router: Router,public dialog: MatDialog) { }
  
  ngOnInit(): void {

  }
  openDialog(): void {
    let dialogRef  = this.dialog.open(DialogsComponent, {
     
     
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      
    });
  }


 removeFile(file){
  this.myFiles.splice(this.myFiles.indexOf(file), 1);
 }
 

  addSkill(skill){
    if(this.selectedSkills.indexOf(skill)>-1)
      this.selectedSkills.splice(this.selectedSkills.indexOf(skill),1);
    else
    this.selectedSkills.push(skill);
    this.fileForm.patchValue({
      skills_add: this.selectedSkills
    });
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
    this.form.patchValue({
      skills_required: this.form.value.skills_add.toString()
    });
    this.form.removeControl("file");
    this.form.removeControl("skills_add");
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
        let dialogRef  = this.dialog.open(DialogsComponent, {
     
     
        });
    
        dialogRef.afterClosed().subscribe(result => {
          console.log('The dialog was closed');
          
        });
        let unixDate=this.transformDateToUnix(this.form.value.deadline).toString();
        const payload = new HttpParams()
        .set('title', this.form.value.title)
         .set('content', this.form.value.content)
         .set('skills_required', this.form.value.skills_required)
         .set('deadline', unixDate)
         .set('attachments', attachmentId.toString());
              this.httpService.posts('/api/v1/create_order/',payload,null).subscribe(data=>{
                     if(data && data.success && data.order_id){        
                      this.router.navigate(['/home-student/dashboard']);
                   }       
                 });

          }, err => console.log('error ' + err),
          () => console.log('Ok ')
        );
    }
  

  transformDate(date) {
    return this.datePipe.transform(date, 'medium')
  }

  transformDateToUnix(date) {
    return moment(date).unix();
  }

  incrementDay() {
    this.deltaDays += 1;
    this.deadlineDate.setDate(this.deadlineDate.getDate() + 1);
    this.form.patchValue({
      deadline:this.transformDate(this.deadlineDate)
    });
   

  }

  decrementDay() {
    if (this.deltaDays <= 0) {
      return;
    }
    this.deltaDays -= 1;
    this.deadlineDate.setDate(this.deadlineDate.getDate() - 1);
    this.form.patchValue({
      deadline:this.transformDate(this.deadlineDate)
    });
   
  }

  incrementHour() {
    this.deltaHours += 1;
    this.deadlineDate.setHours(this.deadlineDate.getHours() + 1);
    this.form.patchValue({
      deadline:this.transformDate(this.deadlineDate)
    });
   

  }

  decrementHour() {
    if (this.deltaHours <= 0) {
      return;
    }
    this.deltaHours -= 1;
    this.deadlineDate.setHours(this.deadlineDate.getHours() - 1);
    this.form.patchValue({
      deadline:this.transformDate(this.deadlineDate)
    });
   
  }


}
