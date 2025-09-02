import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeRoutineComponent } from './home-routine.component';

describe('HomeRoutineComponent', () => {
  let component: HomeRoutineComponent;
  let fixture: ComponentFixture<HomeRoutineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeRoutineComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HomeRoutineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
