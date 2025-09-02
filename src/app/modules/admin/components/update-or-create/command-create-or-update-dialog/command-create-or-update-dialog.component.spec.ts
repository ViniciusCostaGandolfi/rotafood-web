import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommandCreateOrUpdateDialogComponent } from './command-create-or-update-dialog.component';

describe('CommandCreateOrUpdateDialogComponent', () => {
  let component: CommandCreateOrUpdateDialogComponent;
  let fixture: ComponentFixture<CommandCreateOrUpdateDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CommandCreateOrUpdateDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CommandCreateOrUpdateDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
