import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'edu-form-card',
  templateUrl: './edu-form-card.component.html',
  styleUrls: ['./edu-form-card.component.scss']
})
export class EduFormCardComponent implements OnInit {

  @Input() formGroup:FormGroup;

  @Input() formTitle:string="";

  constructor() { }

  ngOnInit(): void {
  }

}
