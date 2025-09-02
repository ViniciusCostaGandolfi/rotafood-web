import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContextModifiersFormComponent } from './context-modifiers-form.component';

describe('ContextModifiersFormComponent', () => {
  let component: ContextModifiersFormComponent;
  let fixture: ComponentFixture<ContextModifiersFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContextModifiersFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ContextModifiersFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
