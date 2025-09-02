import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrdersListPageComponent } from './orders-list-page.component';

describe('OrdersListPageComponent', () => {
  let component: OrdersListPageComponent;
  let fixture: ComponentFixture<OrdersListPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OrdersListPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(OrdersListPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
