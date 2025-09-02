import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReviewOrderPageComponent } from './review-order-page.component';

describe('ReviewOrderPageComponent', () => {
  let component: ReviewOrderPageComponent;
  let fixture: ComponentFixture<ReviewOrderPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReviewOrderPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ReviewOrderPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
