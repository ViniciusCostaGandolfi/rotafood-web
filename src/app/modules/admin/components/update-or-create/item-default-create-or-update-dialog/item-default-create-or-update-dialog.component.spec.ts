import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemDefaultCreateOrUpdateDialogComponent } from './item-default-create-or-update-dialog.component';

describe('ItemDefaultCreateOrUpdateDialogComponent', () => {
  let component: ItemDefaultCreateOrUpdateDialogComponent;
  let fixture: ComponentFixture<ItemDefaultCreateOrUpdateDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ItemDefaultCreateOrUpdateDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ItemDefaultCreateOrUpdateDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
