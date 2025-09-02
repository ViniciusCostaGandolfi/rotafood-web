import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductSelectorDialogComponent } from './product-selector-dialog.component';

describe('ProductSelectorDialogComponent', () => {
  let component: ProductSelectorDialogComponent;
  let fixture: ComponentFixture<ProductSelectorDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductSelectorDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProductSelectorDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
