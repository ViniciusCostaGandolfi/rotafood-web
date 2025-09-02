import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VrpTestComponent } from './vrp-test.component';

describe('VrpTestComponent', () => {
  let component: VrpTestComponent;
  let fixture: ComponentFixture<VrpTestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VrpTestComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(VrpTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
