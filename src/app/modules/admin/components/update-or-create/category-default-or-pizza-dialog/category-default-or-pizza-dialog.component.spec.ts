import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoryDefaultOrPizzaDialogComponent } from './category-default-or-pizza-dialog.component';

describe('CategoryDefaultOrPizzaDialogComponent', () => {
  let component: CategoryDefaultOrPizzaDialogComponent;
  let fixture: ComponentFixture<CategoryDefaultOrPizzaDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CategoryDefaultOrPizzaDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CategoryDefaultOrPizzaDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
