import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OptionGroupsFormComponent } from './option-groups-form.component';

describe('OptionGroupsFormComponent', () => {
  let component: OptionGroupsFormComponent;
  let fixture: ComponentFixture<OptionGroupsFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OptionGroupsFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(OptionGroupsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
