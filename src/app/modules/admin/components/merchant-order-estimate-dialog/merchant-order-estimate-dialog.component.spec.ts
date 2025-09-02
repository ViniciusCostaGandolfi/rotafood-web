import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MerchantOrderEstimateDialogComponent } from './merchant-order-estimate-dialog.component';

describe('MerchantOrderEstimateDialogComponent', () => {
  let component: MerchantOrderEstimateDialogComponent;
  let fixture: ComponentFixture<MerchantOrderEstimateDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MerchantOrderEstimateDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MerchantOrderEstimateDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
