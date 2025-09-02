import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DefaultPackagingSelectorDialogComponent } from './default-packaging-selector-dialog.component';

describe('DefaultPackagingSelectorDialogComponent', () => {
  let component: DefaultPackagingSelectorDialogComponent;
  let fixture: ComponentFixture<DefaultPackagingSelectorDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DefaultPackagingSelectorDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DefaultPackagingSelectorDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
