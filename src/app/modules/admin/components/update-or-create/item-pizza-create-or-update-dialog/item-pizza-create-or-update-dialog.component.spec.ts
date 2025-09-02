import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemPizzaCreateOrUpdateDialogComponent } from './item-pizza-create-or-update-dialog.component';

describe('ItemPizzaCreateOrUpdateDialogComponent', () => {
  let component: ItemPizzaCreateOrUpdateDialogComponent;
  let fixture: ComponentFixture<ItemPizzaCreateOrUpdateDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ItemPizzaCreateOrUpdateDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ItemPizzaCreateOrUpdateDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
