import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeGoFurtherComponent } from './home-go-further.component';

describe('HomeGoFurtherComponent', () => {
  let component: HomeGoFurtherComponent;
  let fixture: ComponentFixture<HomeGoFurtherComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeGoFurtherComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HomeGoFurtherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
