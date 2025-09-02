import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkersPageComponent } from './workers-page.component';

describe('WorkersPageComponent', () => {
  let component: WorkersPageComponent;
  let fixture: ComponentFixture<WorkersPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WorkersPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(WorkersPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
