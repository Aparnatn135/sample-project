import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EduRegistrationFormComponent } from './edu-registration-form.component';

describe('EduRegistrationFormComponent', () => {
  let component: EduRegistrationFormComponent;
  let fixture: ComponentFixture<EduRegistrationFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EduRegistrationFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EduRegistrationFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
