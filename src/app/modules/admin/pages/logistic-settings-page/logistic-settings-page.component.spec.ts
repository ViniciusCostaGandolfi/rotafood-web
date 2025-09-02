import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LogisticSettingsPageComponent } from './logistic-settings-page.component';

describe('LogisticSettingsPageComponent', () => {
  let component: LogisticSettingsPageComponent;
  let fixture: ComponentFixture<LogisticSettingsPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LogisticSettingsPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LogisticSettingsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
