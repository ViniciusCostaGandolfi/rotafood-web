import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomePricingComponent } from './home-pricing.component';

describe('HomePricingComponent', () => {
  let component: HomePricingComponent;
  let fixture: ComponentFixture<HomePricingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomePricingComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HomePricingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
