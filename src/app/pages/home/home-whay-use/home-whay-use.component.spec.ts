import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeWhayUseComponent } from './home-whay-use.component';

describe('HomeWhayUseComponent', () => {
  let component: HomeWhayUseComponent;
  let fixture: ComponentFixture<HomeWhayUseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeWhayUseComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HomeWhayUseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
