import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CopyOptionGroupsDialogComponent } from './copy-option-groups-dialog.component';

describe('CopyOptionGroupsDialogComponent', () => {
  let component: CopyOptionGroupsDialogComponent;
  let fixture: ComponentFixture<CopyOptionGroupsDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CopyOptionGroupsDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CopyOptionGroupsDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
