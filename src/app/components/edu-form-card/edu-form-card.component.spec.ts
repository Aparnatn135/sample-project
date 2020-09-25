import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EduFormCardComponent } from './edu-form-card.component';

describe('EduFormCardComponent', () => {
  let component: EduFormCardComponent;
  let fixture: ComponentFixture<EduFormCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EduFormCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EduFormCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
