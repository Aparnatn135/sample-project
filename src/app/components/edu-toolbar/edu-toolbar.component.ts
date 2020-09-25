import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';


@Component({
  selector: 'edu-toolbar',
  templateUrl: './edu-toolbar.component.html',
  styleUrls: ['./edu-toolbar.component.scss']
})
export class EduToolbarComponent implements OnInit {

  @Output() menuClicked:EventEmitter<any>=new EventEmitter<any>();

  @Input() toolbarTitle:string;

  constructor() { }

  ngOnInit(): void {
  }

  menuButtonClicked(){
      this.menuClicked.emit();
  }

}
