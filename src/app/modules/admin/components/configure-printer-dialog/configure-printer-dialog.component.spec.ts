import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfigurePrinterDialogComponent } from './configure-printer-dialog.component';

describe('ConfigurePrinterDialogComponent', () => {
  let component: ConfigurePrinterDialogComponent;
  let fixture: ComponentFixture<ConfigurePrinterDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConfigurePrinterDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ConfigurePrinterDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
