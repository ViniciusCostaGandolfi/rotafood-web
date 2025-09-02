import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectImageDialogComponent } from './select-image-dialog.component';

describe('SelectImageDialogComponent', () => {
  let component: SelectImageDialogComponent;
  let fixture: ComponentFixture<SelectImageDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SelectImageDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SelectImageDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
