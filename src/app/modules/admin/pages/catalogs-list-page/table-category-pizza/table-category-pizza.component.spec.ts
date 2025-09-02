import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableCategoryPizzaComponent } from './table-category-pizza.component';

describe('TableCategoryPizzaComponent', () => {
  let component: TableCategoryPizzaComponent;
  let fixture: ComponentFixture<TableCategoryPizzaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TableCategoryPizzaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TableCategoryPizzaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
