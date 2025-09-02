import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemPreparedOrInstructedDialogComponent } from './item-prepared-or-instructed-dialog.component';

describe('ItemPreparedOrInstructedDialogComponent', () => {
  let component: ItemPreparedOrInstructedDialogComponent;
  let fixture: ComponentFixture<ItemPreparedOrInstructedDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ItemPreparedOrInstructedDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ItemPreparedOrInstructedDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
