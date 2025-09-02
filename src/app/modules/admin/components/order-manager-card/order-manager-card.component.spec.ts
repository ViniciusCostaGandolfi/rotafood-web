import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderManagerCardComponent } from './order-manager-card.component';

describe('OrderManagerCardComponent', () => {
  let component: OrderManagerCardComponent;
  let fixture: ComponentFixture<OrderManagerCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OrderManagerCardComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(OrderManagerCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
