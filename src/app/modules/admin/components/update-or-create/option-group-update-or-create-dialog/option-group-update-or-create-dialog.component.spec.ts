import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OptionGroupUpdateOrCreateDialogComponent } from './option-group-update-or-create-dialog.component';

describe('OptionGroupUpdateOrCreateDialogComponent', () => {
  let component: OptionGroupUpdateOrCreateDialogComponent;
  let fixture: ComponentFixture<OptionGroupUpdateOrCreateDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OptionGroupUpdateOrCreateDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(OptionGroupUpdateOrCreateDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
