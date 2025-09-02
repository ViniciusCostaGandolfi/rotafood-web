import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginDtoComponent } from './LoginDto.component';

describe('LoginDtoComponent', () => {
  let component: LoginDtoComponent;
  let fixture: ComponentFixture<LoginDtoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoginDtoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LoginDtoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
