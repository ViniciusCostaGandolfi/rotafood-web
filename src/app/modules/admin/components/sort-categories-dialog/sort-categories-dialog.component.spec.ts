import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SortCategoriesDialogComponent } from './sort-categories-dialog.component';

describe('SortCategoriesDialogComponent', () => {
  let component: SortCategoriesDialogComponent;
  let fixture: ComponentFixture<SortCategoriesDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SortCategoriesDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SortCategoriesDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
