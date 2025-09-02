import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddOrderItemDialogComponent } from './add-order-item-dialog.component';

describe('AddOrderItemDialogComponent', () => {
  let component: AddOrderItemDialogComponent;
  let fixture: ComponentFixture<AddOrderItemDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddOrderItemDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddOrderItemDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
