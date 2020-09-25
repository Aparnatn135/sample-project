import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators,AbstractControl  } from '@angular/forms';
import { countries } from './../../common/country-list';
import { roles } from './../../common/role-list';
import { Observable } from 'rxjs';


@Component({
  selector: 'edu-registration-form',
  templateUrl: './edu-registration-form.component.html',
  styleUrls: ['./edu-registration-form.component.scss']
})
export class EduRegistrationFormComponent implements OnInit {

  @Input() formTitle: string = "";
  @Input() buttonTitle: string = "";
  @Input() formType: number

  countryList = countries;
  rolesList = roles;
  selectedValue:any;
  unamePattern = "\b[A-Za-z][A-Za-z0-9]{2,15}\b";
  @Output() submitClicked: EventEmitter<any> = new EventEmitter<any>();

  registerform = new FormGroup({
    name: new FormControl('',Validators.pattern('^[a-zA-Z ]{2,50}$')),
    username: new FormControl('', Validators.pattern('^[a-zA-Z][a-zA-Z0-9_-]{2,30}$')),
    email: new FormControl('', Validators.email),
    password: new FormControl('',Validators.pattern('^(?=.*[0-9])(?=.*[a-zA-Z]).{8,30}$')),
    confirm_password: new FormControl('',Validators.required),
    role: new FormControl(''),
  },this.passwordMatchValidator);

  constructor() { }


  ngOnInit() {
  }

  displayFn(user: any): string {
    return user && user.name ? user.name : '';
  }

  private _filter(name: string): any[] {
    const filterValue = name.toLowerCase();

    console.log(filterValue);

    return this.countryList.filter(option => option.name.toLowerCase().indexOf(filterValue) === 0);
  }
  passwordMatchValidator(frm: FormGroup) {
    return frm.controls['password'].value === frm.controls['confirm_password'].value ? null : {'mismatch': true};
  }
  submit() {
    console.log(this.registerform.value)
    this.submitClicked.emit({ formType: this.formType, formData: this.registerform.value });
  }


}