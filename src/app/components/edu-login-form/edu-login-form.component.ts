import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { countries } from './../../common/country-list';
import { AppState } from 'src/app/redux/app.reducer';
import { loginRoles } from './../../common/role-list';

@Component({
  selector: 'edu-login-form',
  templateUrl: './edu-login-form.component.html',
  styleUrls: ['./edu-login-form.component.scss']
})
export class EduLoginFormComponent implements OnInit {

  @Input() formTitle: string = "";
  @Input() formType: number

  countryList = countries;
  rolesList = loginRoles;

  @Output() submitClicked: EventEmitter<any> = new EventEmitter<any>();

  loginform = new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('',Validators.required),
    role: new FormControl(''),
  });

  constructor(private store: Store<AppState>) { }

  ngOnInit(): void {
    
  }

  submit() {
    this.submitClicked.emit({ formType: this.formType, formData: this.loginform.value });
  }


}
