import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PackagingUpdateOrCreateDialogComponent } from './packaging-update-or-create-dialog.component';

describe('PackagingUpdateOrCreateDialogComponent', () => {
  let component: PackagingUpdateOrCreateDialogComponent;
  let fixture: ComponentFixture<PackagingUpdateOrCreateDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PackagingUpdateOrCreateDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PackagingUpdateOrCreateDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
