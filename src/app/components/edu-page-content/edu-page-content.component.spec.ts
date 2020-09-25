import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EduPageContentComponent } from './edu-page-content.component';

describe('EduPageContentComponent', () => {
  let component: EduPageContentComponent;
  let fixture: ComponentFixture<EduPageContentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EduPageContentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EduPageContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
