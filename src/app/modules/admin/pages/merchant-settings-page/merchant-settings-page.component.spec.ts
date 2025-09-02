import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MerchantSettingsPageComponent } from './merchant-settings-page.component';

describe('MerchantSettingsPageComponent', () => {
  let component: MerchantSettingsPageComponent;
  let fixture: ComponentFixture<MerchantSettingsPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MerchantSettingsPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MerchantSettingsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
