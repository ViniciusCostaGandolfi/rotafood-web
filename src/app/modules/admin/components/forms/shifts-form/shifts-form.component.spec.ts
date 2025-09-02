import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShiftsFormComponent } from './shifts-form.component';

describe('ShiftsFormComponent', () => {
  let component: ShiftsFormComponent;
  let fixture: ComponentFixture<ShiftsFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShiftsFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ShiftsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
