import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableCategoryDefaultComponent } from './table-category-default.component';

describe('TableCategoryDefaultComponent', () => {
  let component: TableCategoryDefaultComponent;
  let fixture: ComponentFixture<TableCategoryDefaultComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TableCategoryDefaultComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TableCategoryDefaultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
