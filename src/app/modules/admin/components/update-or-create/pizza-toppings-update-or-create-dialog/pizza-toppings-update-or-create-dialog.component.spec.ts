import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PizzaToppingsUpdateOrCreateDialogComponent } from './pizza-toppings-update-or-create-dialog.component';

describe('PizzaToppingsUpdateOrCreateDialogComponent', () => {
  let component: PizzaToppingsUpdateOrCreateDialogComponent;
  let fixture: ComponentFixture<PizzaToppingsUpdateOrCreateDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PizzaToppingsUpdateOrCreateDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PizzaToppingsUpdateOrCreateDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
