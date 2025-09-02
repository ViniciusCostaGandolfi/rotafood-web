import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PackagingsFormComponent } from './packagings-form.component';

describe('PackagingsFormComponent', () => {
  let component: PackagingsFormComponent;
  let fixture: ComponentFixture<PackagingsFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PackagingsFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PackagingsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
