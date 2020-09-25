import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EduLoginFormComponent } from './edu-login-form.component';

describe('EduLoginFormComponent', () => {
  let component: EduLoginFormComponent;
  let fixture: ComponentFixture<EduLoginFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EduLoginFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EduLoginFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
