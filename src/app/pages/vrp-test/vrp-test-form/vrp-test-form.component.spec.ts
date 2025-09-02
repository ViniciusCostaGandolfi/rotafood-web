import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VrpTestFormComponent } from './vrp-test-form.component';

describe('VrpTestFormComponent', () => {
  let component: VrpTestFormComponent;
  let fixture: ComponentFixture<VrpTestFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VrpTestFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(VrpTestFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
