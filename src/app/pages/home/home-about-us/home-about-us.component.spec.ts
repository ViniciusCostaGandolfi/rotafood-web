import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeAboutUsComponent } from './home-about-us.component';

describe('HomeAboutUsComponent', () => {
  let component: HomeAboutUsComponent;
  let fixture: ComponentFixture<HomeAboutUsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeAboutUsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HomeAboutUsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
