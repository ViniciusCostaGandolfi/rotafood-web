import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrdersManagerPageComponent } from './orders-manager-page.component';

describe('OrdersManagerPageComponent', () => {
  let component: OrdersManagerPageComponent;
  let fixture: ComponentFixture<OrdersManagerPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OrdersManagerPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(OrdersManagerPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
