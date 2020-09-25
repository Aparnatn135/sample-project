import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderBidRejectedComponent } from './order-bid-rejected.component';

describe('OrderBidRejectedComponent', () => {
  let component: OrderBidRejectedComponent;
  let fixture: ComponentFixture<OrderBidRejectedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrderBidRejectedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderBidRejectedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
