import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EduToolbarComponent } from './edu-toolbar.component';

describe('EduToolbarComponent', () => {
  let component: EduToolbarComponent;
  let fixture: ComponentFixture<EduToolbarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EduToolbarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EduToolbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
