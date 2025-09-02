import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoryUpdateOrCrateDialogComponent } from './category-update-or-crate-dialog.component';

describe('CategoryUpdateOrCrateDialogComponent', () => {
  let component: CategoryUpdateOrCrateDialogComponent;
  let fixture: ComponentFixture<CategoryUpdateOrCrateDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CategoryUpdateOrCrateDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CategoryUpdateOrCrateDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
