import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatusSlideToggleComponent } from './status-slide-toggle.component';

describe('StatusSlideToggleComponent', () => {
  let component: StatusSlideToggleComponent;
  let fixture: ComponentFixture<StatusSlideToggleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StatusSlideToggleComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(StatusSlideToggleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
