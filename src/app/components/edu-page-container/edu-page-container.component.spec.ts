import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EduPageContainerComponent } from './edu-page-container.component';

describe('EduPageContainerComponent', () => {
  let component: EduPageContainerComponent;
  let fixture: ComponentFixture<EduPageContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EduPageContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EduPageContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
