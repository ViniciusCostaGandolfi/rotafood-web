import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemInstructedCreateDialogComponent } from './item-instructed-create-dialog.component';

describe('ItemInstructedCreateDialogComponent', () => {
  let component: ItemInstructedCreateDialogComponent;
  let fixture: ComponentFixture<ItemInstructedCreateDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ItemInstructedCreateDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ItemInstructedCreateDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
