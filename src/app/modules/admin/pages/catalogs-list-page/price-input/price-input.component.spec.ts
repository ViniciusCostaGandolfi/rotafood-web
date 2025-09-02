import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PriceInputComponent } from './price-input.component';

describe('PriceInputComponent', () => {
  let component: PriceInputComponent;
  let fixture: ComponentFixture<PriceInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PriceInputComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PriceInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
