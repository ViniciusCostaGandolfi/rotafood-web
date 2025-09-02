import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkerUpdateOrCreateDialogComponent } from './worker-update-or-create-dialog.component';

describe('WorkerUpdateOrCreateDialogComponent', () => {
  let component: WorkerUpdateOrCreateDialogComponent;
  let fixture: ComponentFixture<WorkerUpdateOrCreateDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WorkerUpdateOrCreateDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(WorkerUpdateOrCreateDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
