import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectAddressDialogComponent } from './select-address-dialog.component';

describe('SelectAddressDialogComponent', () => {
  let component: SelectAddressDialogComponent;
  let fixture: ComponentFixture<SelectAddressDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SelectAddressDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SelectAddressDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
