import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemInstructedSelectorDialogComponent } from './item-instructed-selector-dialog.component';

describe('ItemInstructedSelectorDialogComponent', () => {
  let component: ItemInstructedSelectorDialogComponent;
  let fixture: ComponentFixture<ItemInstructedSelectorDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ItemInstructedSelectorDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ItemInstructedSelectorDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
