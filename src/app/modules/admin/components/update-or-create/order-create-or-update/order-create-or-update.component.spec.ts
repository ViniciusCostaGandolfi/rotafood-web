import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderCreateOrUpdateComponent } from './order-create-or-update.component';

describe('OrderCreateOrUpdateComponent', () => {
  let component: OrderCreateOrUpdateComponent;
  let fixture: ComponentFixture<OrderCreateOrUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OrderCreateOrUpdateComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(OrderCreateOrUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
